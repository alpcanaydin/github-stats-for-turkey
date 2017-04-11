import { locations as initialData } from '../../../data/initial.json';
import api, { API_STATUS } from '../../../util/api';

const filters = {
  year: { type: 'RANGE', min: 2008, max: 2017 },
};

// Actions
const REQUEST = 'location/list/REQUEST';
const SUCCESS = 'location/list/SUCCESS';
const FAIL = 'location/list/FAIL';

// Action Creators
export const success = (data, min, max) => ({
  type: SUCCESS,
  data,
  min,
  max,
});

export const fail = error => ({
  type: FAIL,
  error,
});

export const filterByYear = ({ min, max }) =>
  async dispatch => {
    if (min === filters.year.min && max === filters.year.max) {
      dispatch(success(initialData, min, max));

      return;
    }

    dispatch({ type: REQUEST });

    try {
      const response = await api.get(`/location-stats?minYear=${min}&maxYear=${max}`);

      if (!response.ok) {
        throw new Error(response.data || response.problem);
      }

      dispatch(success(response.data.locations, min, max));
    } catch (err) {
      dispatch(fail(err.message));
    }
  };

// Reducer
const initialState = {
  status: API_STATUS.FETCHED,
  data: initialData,
  filters,
};

export default (state = initialState, { type, data, min, max, error }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        status: API_STATUS.LOADING,
      };
    case SUCCESS:
      return {
        ...state,
        status: API_STATUS.FETCHED,
        data,
        filters: {
          year: { type: 'RANGE', min, max },
        },
      };
    case FAIL:
      return {
        ...state,
        status: API_STATUS.FAILED,
        error,
      };
    default:
      return state;
  }
};

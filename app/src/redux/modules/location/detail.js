import api, { API_STATUS } from '../../../util/api';

// Actions
const REQUEST = 'location/detail/REQUEST';
const SUCCESS = 'location/detail/SUCCESS';
const FAIL = 'location/detail/FAIL';

// Action Creators
export const success = (location, data) => ({
  type: SUCCESS,
  location,
  data,
});

export const fail = (location, error) => ({
  type: FAIL,
  location,
  error,
});

export const request = location =>
  async dispatch => {
    dispatch({ type: REQUEST, location });

    try {
      const { data } = await api.get(`/location/${location}`);
      dispatch(success(location, data));
    } catch (err) {
      dispatch(fail(location, err.message));
    }
  };

// Reducer
export default (state = {}, { type, location, data, error }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        [location]: {
          status: API_STATUS.LOADING,
          data: {},
          error: null,
        },
      };
    case SUCCESS:
      return {
        ...state,
        [location]: {
          status: API_STATUS.FETCHED,
          data,
          error: null,
        },
      };
    case FAIL:
      return {
        ...state,
        [location]: {
          status: API_STATUS.FAILED,
          data: {},
          error,
        },
      };
    default:
      return state;
  }
};

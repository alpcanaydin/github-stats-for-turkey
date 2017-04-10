import api, { API_STATUS } from '../../util/api';

// Actions
const REQUEST = 'developer/REQUEST';
const SUCCESS = 'developer/SUCCESS';
const FAIL = 'developer/FAIL';

// Action Creators
export const success = (developer, data) => ({
  type: SUCCESS,
  developer,
  data,
});

export const fail = (developer, error) => ({
  type: FAIL,
  developer,
  error,
});

export const request = developer =>
  async dispatch => {
    dispatch({ type: REQUEST, developer });

    try {
      const { data } = await api.get(`/user/${developer.toLowerCase()}`);
      dispatch(success(developer, data));
    } catch (err) {
      dispatch(fail(developer, err.message));
    }
  };

// Reducer
export default (state = {}, { type, developer, data, error }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        [developer]: {
          status: API_STATUS.LOADING,
          data: {},
          error: null,
        },
      };
    case SUCCESS:
      return {
        ...state,
        [developer]: {
          status: API_STATUS.FETCHED,
          data,
          error: null,
        },
      };
    case FAIL:
      return {
        ...state,
        [developer]: {
          status: API_STATUS.FAILED,
          data: {},
          error,
        },
      };
    default:
      return state;
  }
};

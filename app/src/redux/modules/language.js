import api, { API_STATUS } from '../../util/api';

// Actions
const REQUEST = 'language/REQUEST';
const SUCCESS = 'language/SUCCESS';
const FAIL = 'language/FAIL';

// Action Creators
export const success = (language, data) => ({
  type: SUCCESS,
  language,
  data,
});

export const fail = (language, error) => ({
  type: FAIL,
  language,
  error,
});

export const request = language =>
  async dispatch => {
    dispatch({ type: REQUEST, language });

    try {
      const { data } = await api.get(`/language/${language}`);
      dispatch(success(language, data));
    } catch (err) {
      dispatch(fail(language, err.message));
    }
  };

// Reducer
export default (state = {}, { type, language, data, error }) => {
  switch (type) {
    case REQUEST:
      return {
        ...state,
        [language]: {
          status: API_STATUS.LOADING,
          data: {},
          error: null,
        },
      };
    case SUCCESS:
      return {
        ...state,
        [language]: {
          status: API_STATUS.FETCHED,
          data,
          error: null,
        },
      };
    case FAIL:
      return {
        ...state,
        [language]: {
          status: API_STATUS.FAILED,
          data: {},
          error,
        },
      };
    default:
      return state;
  }
};

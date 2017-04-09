import { API_STATUS } from './api';

export const emptyStateItem = {
  status: API_STATUS.INIT,
  data: {},
  error: null,
};

export const isInit = state => state.status === API_STATUS.INIT;
export const isLoading = state => state.status === API_STATUS.LOADING || isInit(state);
export const isFetched = state => state.status === API_STATUS.FETCHED;
export const isFailed = state => state.status === API_STATUS.FAILED;

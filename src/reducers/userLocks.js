import { createActions, createReducer } from "reduxsauce";
import APIConstants from "../constants/APIConstants";
import { normalizeArrayToObject } from "../utils/ReduxUtils";
import LockAPIConstants from "../constants/LockAPIConstants";

// types and action creators
export const { Types, Creators } = createActions(
  {
    getUserLocksRequest: null,
    getUserLocksSuccess: ["payload"],
    getUserLocksFailure: null,
    unlockRequest: ["payload"],
    unlockSuccess: ["payload"],
    unlockFailure: ["payload"]
  },
  {}
);

// the initial state of this reducer
export const INITIAL_STATE = {
  error: null,
  locks: {},
  lockIds: [],
  getUserLocksAPIStatus: APIConstants.API_INITIAL
};

export const getUserLocksRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUserLocksAPIStatus: APIConstants.API_FETCHING
  };
};

// the eagle has landed
export const getUserLocksSuccess = (state = INITIAL_STATE, { payload }) => {
  const { normalizedObject, keys } = normalizeArrayToObject(
    payload.data,
    LockAPIConstants.ID_KEY,
    {
      unlockAPIStatus: APIConstants.API_INITIAL
    }
  );

  return {
    ...state,
    locks: normalizedObject,
    lockIds: keys,
    getUserLocksAPIStatus: APIConstants.API_SUCCESS
  };
};

// uh oh
export const getUserLocksFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    getUserLocksAPIStatus: APIConstants.API_SERVER_ERROR
  };
};

export const unlockRequest = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    locks: {
      ...state.locks,
      [payload.id]: {
        ...state.locks[payload.id],
        unlockAPIStatus: APIConstants.API_FETCHING
      }
    }
  };
};

// the eagle has landed
export const unlockSuccess = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    locks: {
      ...state.locks,
      [payload.id]: {
        ...payload,
        unlockAPIStatus: APIConstants.API_SUCCESS
      }
    }
  };
};

// uh oh
export const unlockFailure = (state = INITIAL_STATE, { payload }) => {
  return {
    ...state,
    locks: {
      ...state.locks,
      [payload.id]: {
        ...state.locks[payload.id],
        unlocked: false,
        unlockAPIStatus: APIConstants.API_SERVER_ERROR
      }
    }
  };
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_USER_LOCKS_REQUEST]: getUserLocksRequest,
  [Types.GET_USER_LOCKS_SUCCESS]: getUserLocksSuccess,
  [Types.GET_USER_LOCKS_FAILURE]: getUserLocksFailure,
  [Types.UNLOCK_REQUEST]: unlockRequest,
  [Types.UNLOCK_SUCCESS]: unlockSuccess,
  [Types.UNLOCK_FAILURE]: unlockFailure
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
export default Creators;

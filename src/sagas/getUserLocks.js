import { put } from "redux-saga/effects";
import GetUserLocks from "../reducers/userLocks";
import URLs from "../constants/URLs";

function* getUserLocksRequest({ api }) {
  try {
    const locks = yield api.get(URLs.GET_LOCKS);
    yield put(GetUserLocks.getUserLocksSuccess(locks));
  } catch (error) {
    yield put(GetUserLocks.getUserLocksFailure());
  }
}

export { getUserLocksRequest };

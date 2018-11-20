import { put } from "redux-saga/effects";
import GetUserLocks from "../reducers/userLocks";
import URLs from "../constants/URLs";

function* unlockRequest({ api }, { payload }) {
  const url = URLs.getUnlockURL(payload.id);
  try {
    const response = yield api.post(url);
    yield put(GetUserLocks.unlockSuccess(response));
  } catch (error) {
    yield put(GetUserLocks.unlockFailure(payload));
  }
}

export { unlockRequest };

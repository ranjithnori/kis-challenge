import { all, takeEvery, takeLatest } from "redux-saga/effects";
import Kisi from "kisi-client";
import { Types as UserLockTypes } from "../reducers/userLocks";
import { getUserLocksRequest } from "./getUserLocks";
import { unlockRequest } from "./unlocks";
import { API_KEY } from "../constants/index";

const kisiClient = new Kisi();
kisiClient.setLoginSecret(API_KEY);
const argsPassed = { api: kisiClient };

const getUserLocksSagas = [
  takeLatest(
    UserLockTypes.GET_USER_LOCKS_REQUEST,
    getUserLocksRequest,
    argsPassed
  )
];

const unlockSagas = [
  takeEvery(UserLockTypes.UNLOCK_REQUEST, unlockRequest, argsPassed)
];

function* rootSaga() {
  yield all([...getUserLocksSagas, ...unlockSagas]);
}

export default rootSaga;

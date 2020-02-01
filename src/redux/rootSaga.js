import { all } from "redux-saga/effects";
import { drugListWatcherSaga } from "./modules/drugList";
import { prescriptionListWatcherSaga } from "./modules/prescriptionList";

export default function* rootSaga() {
  yield all([drugListWatcherSaga(), prescriptionListWatcherSaga()]);
}

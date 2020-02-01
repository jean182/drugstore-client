import { handleActions, createAction } from "redux-actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { addPrescription, fetchPrescriptionList } from "../../api/prescriptions";

export const GET_PRESCRIPTION_LIST = "drugstore/prescriptions/GET_PRESCRIPTION_LIST";
export const GET_PRESCRIPTION_LIST_SUCCESS = "drugstore/prescriptions/GET_PRESCRIPTION_LIST_SUCCESS";
export const GET_PRESCRIPTION_LIST_FAIL = "drugstore/prescriptions/GET_PRESCRIPTION_LIST_FAIL";
export const NEW_PRESCRIPTION = "drugstore/prescriptions/NEW_PRESCRIPTION";
export const NEW_PRESCRIPTION_SUCCESS = "drugstore/prescriptions/NEW_PRESCRIPTION_SUCCESS";
export const NEW_PRESCRIPTION_FAIL = "drugstore/prescriptions/NEW_PRESCRIPTION_FAIL";

// Initial State
export const getInitialState = () => {
  return {
    loading: false,
    prescriptions: [],
    error: null
  };
};

// Reducer
const prescriptionListReducer = handleActions(
  {
    [GET_PRESCRIPTION_LIST]: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    [GET_PRESCRIPTION_LIST_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        prescriptions:  data
      };
    },
    [GET_PRESCRIPTION_LIST_FAIL]: (state, action) => {
      const message = action.payload;
      return {
        ...state,
        loading: false,
        error: message
      };
    },
    [NEW_PRESCRIPTION]: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    [NEW_PRESCRIPTION_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        prescriptions: [...state.prescriptions, data]
      };
    },
    [NEW_PRESCRIPTION_FAIL]: (state, action) => {
      const message = action.payload;
      return {
        ...state,
        loading: false,
        error: message
      };
    }
  },
  getInitialState()
);

export default prescriptionListReducer;

// Action Creators

export const getPrescriptionList = createAction(GET_PRESCRIPTION_LIST);

export const getPrescriptionListSuccess = createAction(GET_PRESCRIPTION_LIST_SUCCESS);

export const getPrescriptionListFail = createAction(GET_PRESCRIPTION_LIST_FAIL);

export const newPrescription = createAction(NEW_PRESCRIPTION);

export const newPrescriptionSuccess = createAction(NEW_PRESCRIPTION_SUCCESS);

export const newPrescriptionFail = createAction(NEW_PRESCRIPTION_FAIL);

// Sagas

function* getPrescriptionListSaga() {
  try {
    const response = yield call(fetchPrescriptionList);
    yield put(getPrescriptionListSuccess(response));
  } catch (error) {
    yield put(getPrescriptionListFail(error.message));
  }
}

function* addPrescriptionListSaga(action) {
  try {
    const prescription = action.payload
    const response = yield call(addPrescription, prescription);
    yield put(newPrescriptionSuccess(response));
  } catch (error) {
    yield put(newPrescriptionFail(error.message));
  }
}

export function* prescriptionListWatcherSaga() {
  yield all([
    takeLatest(GET_PRESCRIPTION_LIST, getPrescriptionListSaga),
    takeLatest(NEW_PRESCRIPTION, addPrescriptionListSaga)
  ])
}

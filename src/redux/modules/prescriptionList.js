import { handleActions, createAction } from "redux-actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { doseToArray, freqToArray } from "../../utils/data";
import { addPrescription, deletePrescriptionList, fetchPrescriptionList, updatePrescription } from "../../api/prescriptions";

export const GET_PRESCRIPTION_LIST = "drugstore/prescriptions/GET_PRESCRIPTION_LIST";
export const GET_PRESCRIPTION_LIST_SUCCESS = "drugstore/prescriptions/GET_PRESCRIPTION_LIST_SUCCESS";
export const GET_PRESCRIPTION_LIST_FAIL = "drugstore/prescriptions/GET_PRESCRIPTION_LIST_FAIL";
export const NEW_PRESCRIPTION = "drugstore/prescriptions/NEW_PRESCRIPTION";
export const NEW_PRESCRIPTION_SUCCESS = "drugstore/prescriptions/NEW_PRESCRIPTION_SUCCESS";
export const NEW_PRESCRIPTION_FAIL = "drugstore/prescriptions/NEW_PRESCRIPTION_FAIL";
export const EDIT_PRESCRIPTION = "drugstore/prescriptions/EDIT_PRESCRIPTION";
export const EDIT_PRESCRIPTION_SUCCESS = "drugstore/prescriptions/EDIT_PRESCRIPTION_SUCCESS";
export const EDIT_PRESCRIPTION_FAIL = "drugstore/prescriptions/EDIT_PRESCRIPTION_FAIL";
export const REMOVE_PRESCRIPTION = "drugstore/prescriptions/REMOVE_PRESCRIPTION";
export const REMOVE_PRESCRIPTION_SUCCESS = "drugstore/prescriptions/REMOVE_PRESCRIPTION_SUCCESS";
export const REMOVE_PRESCRIPTION_FAIL = "drugstore/prescriptions/REMOVE_PRESCRIPTION_FAIL";

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
      const prescriptions = data.map(prescription => {
        const { drug } = prescription;

        return {
          ...prescription,
          drug: {
            ...drug,
            conditions: drug.conditions.map(condition => {
              const dose = doseToArray(condition.dose);
              const frequency = freqToArray(condition.frequency);
              return {
                ...condition,
                dose,
                frequency
              }
            })
          }
        }
      })
      return {
        ...state,
        loading: false,
        prescriptions
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
    },
    [EDIT_PRESCRIPTION]: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    [EDIT_PRESCRIPTION_SUCCESS]: (state, action) => {
      const { data } = action.payload;
      const prescriptions = state.prescriptions.map(prescription => {
        if (prescription.id === data.id) return data;
        return prescription;
      })
      return {
        ...state,
        loading: false,
        prescriptions
      };
    },
    [EDIT_PRESCRIPTION_FAIL]: (state, action) => {
      const message = action.payload;
      return {
        ...state,
        loading: false,
        error: message
      };
    },
    [REMOVE_PRESCRIPTION]: (state, action) => {
      return {
        ...state,
        prescriptions: state.prescriptions.filter(prescription => prescription.id !== action.payload)
      };
    },
    [REMOVE_PRESCRIPTION_SUCCESS]: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    [REMOVE_PRESCRIPTION_FAIL]: (state, action) => {
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

export const editPrescription = createAction(EDIT_PRESCRIPTION);

export const editPrescriptionSuccess = createAction(EDIT_PRESCRIPTION_SUCCESS);

export const editPrescriptionFail = createAction(EDIT_PRESCRIPTION_FAIL);

export const removePrescription = createAction(REMOVE_PRESCRIPTION);

export const removePrescriptionSuccess = createAction(REMOVE_PRESCRIPTION_SUCCESS);

export const removePrescriptionFail = createAction(REMOVE_PRESCRIPTION_FAIL);

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

function* editPrescriptionListSaga(action) {
  try {
    const prescription = action.payload
    const response = yield call(updatePrescription, prescription);
    yield put(editPrescriptionSuccess(response));
  } catch (error) {
    yield put(editPrescriptionFail(error.message));
  }
}

function* deletePrescriptionListSaga(action) {
  try {
    const id = action.payload
    yield call(deletePrescriptionList, id);
    yield put(removePrescriptionSuccess());
  } catch (error) {
    // yield put(removePrescriptionFail(error.message));
  }
}

export function* prescriptionListWatcherSaga() {
  yield all([
    takeLatest(GET_PRESCRIPTION_LIST, getPrescriptionListSaga),
    takeLatest(NEW_PRESCRIPTION, addPrescriptionListSaga),
    takeLatest(EDIT_PRESCRIPTION, editPrescriptionListSaga),
    takeLatest(REMOVE_PRESCRIPTION, deletePrescriptionListSaga)
  ])
}

import { call, put, takeLatest } from "redux-saga/effects";
import { handleActions, createAction } from "redux-actions";
import { fetchDrugList } from "../../api/drugs";
import { doseToArray, freqToArray } from "../../utils/data";

export const GET_DRUG_LIST = "drugstore/drug/GET_DRUG_LIST";
export const GET_DRUG_LIST_SUCCESS = "drugstore/drug/GET_DRUG_LIST_SUCCESS";
export const GET_DRUG_LIST_FAIL = "drugstore/drug/GET_DRUG_LIST_FAIL";

// Initial State
export const getInitialState = () => {
  return {
    loading: false,
    drugs: [],
    error: null
  };
};

// Reducer
const drugListReducer = handleActions(
  {
    [GET_DRUG_LIST]: (state) => {
      return {
        ...state,
        loading: true
      };
    },
    [GET_DRUG_LIST_SUCCESS]: (state, action) => {
      const { data } = action.payload
      const drugs = data.map(drug => {
        const dose = doseToArray(drug.dose);
        const frequency = freqToArray(drug.frequency);
        return ({
          ...drug,
          dose ,
          frequency
        })
      })
      return {
        ...state,
        loading: false,
        drugs
      };
    },
    [GET_DRUG_LIST_FAIL]: (state, action) => {
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

export default drugListReducer;

// Action Creators

export const getDrugList = createAction(GET_DRUG_LIST);

export const getDrugListSuccess = createAction(GET_DRUG_LIST_SUCCESS);

export const getDrugListFail = createAction(GET_DRUG_LIST_FAIL);

// Sagas

function* getDrugListSaga() {
  try {
    const response = yield call(fetchDrugList);
    yield put(getDrugListSuccess(response));
  } catch (error) {
    yield put(getDrugListFail(error.message));
  }
}

export function* drugListWatcherSaga() {
  yield takeLatest(GET_DRUG_LIST, getDrugListSaga)
}

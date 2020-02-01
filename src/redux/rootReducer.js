import { combineReducers } from "redux";
import drugListReducer from "./modules/drugList";
import prescriptionListReducer from "./modules/prescriptionList";

const rootReducer = combineReducers({
  drugListReducer,
  prescriptionListReducer
});

export default rootReducer;

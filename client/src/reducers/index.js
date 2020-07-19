import { combineReducers } from "redux";
import transaction from "./reducer";


const rootReducer = combineReducers({
   expense: transaction
});
export default rootReducer;
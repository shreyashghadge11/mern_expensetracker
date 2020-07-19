import { ADD_EXPENSE, SET_ERRORS, LOADING} from '../actions/type';
import { UPDATE_EXPENSE,DELETE_EXPENSE,GET_EXPENSE} from '../actions/type';



const initialstate={
   transactions:[],
   transaction :{},
   isloading:false,
   errors:{}
   
};


export default function(state=initialstate,action){
    switch(action.type){
            case ADD_EXPENSE:
                return{
                    ...state,
                    transactions:[...state.transactions,action.payload]
                }
            case DELETE_EXPENSE:
                return{
                    ...state, 
                    transactions: state.transactions.filter(post => post._id !== action.payload)
                }
            case GET_EXPENSE:
                return{
                    ...state,
                    transactions:[...action.payload]
                } 
            case UPDATE_EXPENSE:
                const transactions = state.transactions.filter(
                    post => post._id !== action.payload._id
                 );
                return{
                    ...state,
                    
                    transactions:[...transactions,action.payload]
                }
            case SET_ERRORS:
                return{
                    ...state,
                    errors:action.payload
                }
            case LOADING:
                return{
                    ...state,
                    isloading:!state.isloading
            }
            default:
                return{state}
    }
}
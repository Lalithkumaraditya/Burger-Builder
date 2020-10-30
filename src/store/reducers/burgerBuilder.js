import * as actionTypes from '../actions/actionsTypes';

const initialState={
    ingredients:null,
    totalPrice:50, 
 purchaseable:false,
 error:false
};
const INGREDIENT_PRIES={
     
    salad:35,
    cheese:50,
    meat:90,
    bacon:60

};

const reducer=(state=initialState,action)=>{
switch(action.type){
    case actionTypes.ADD_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]+1

            },
            totalPrice:state.totalPrice+INGREDIENT_PRIES[action.ingredientName]
    };
    case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRIES[action.ingredientName]
        };
        case actionTypes.SET_INGREDIENTS:
            return{
                 ...state,
                 ingredients:{
                     salad:action.ingredients.salad,
                     bacon:action.ingredients.bacon,
                     cheese:action.ingredients.cheese,
                     meat:action.ingredients.meat,

                 },
                 totalPrice:50,
                 error:false
            }
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:true
                }

        default:
            return state;
}

};

export default reducer;
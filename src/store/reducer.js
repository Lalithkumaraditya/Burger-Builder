import * as actionTypes from './actions';

const initialState={
    ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
    },
    totalPrice:50, 
 purchaseable:false
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
        default:
            return state;
}
};

export default reducer;
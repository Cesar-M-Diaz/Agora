const initialState = {
    // Global state keys here

}

// Modify the reducer in order to receive the actions
const reducer = function(state = initialState, action){
    if(action.type === 'INCREMENT') {
        return { ...state, count: state.count + 1 }
    }
}

export default reducer;
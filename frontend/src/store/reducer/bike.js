const initalState = {
    bikeData :[]
}
const bikeDataReducer = (state = initalState , action)=>{
    switch (action.type) {
        case 'GETBIKEDATA':
            return {...state, bikeData: action.payload}
        default:
            return state;
    }
}

export default bikeDataReducer
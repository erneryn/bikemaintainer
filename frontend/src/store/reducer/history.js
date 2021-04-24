const serviceHistroyReducer = (state=[], action)=>{
    switch (action.typle) {
        case 'ADDNEWSERVICE':
            return state.concat(['new service'])
        default:
            return state;
    }
}

export default serviceHistroyReducer
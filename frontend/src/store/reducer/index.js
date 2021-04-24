import { combineReducers } from '@reduxjs/toolkit';
import bikdeDataReducer from './bike';
import serviceHistoryReducer from './history';

const allReducer = combineReducers({
    bikeData: bikdeDataReducer,
    serviceData: serviceHistoryReducer
})

export default allReducer
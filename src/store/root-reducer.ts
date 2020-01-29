import { combineReducers } from 'redux';

import dataReducer from 'src/features/data/reducer';

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;

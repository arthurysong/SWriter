import { applyMiddleware, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
 
import rootReducer from './index';
 
// auth state is persisted between refreshes
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
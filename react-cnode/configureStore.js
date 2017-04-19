import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
	return createStoreWithMiddleware(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

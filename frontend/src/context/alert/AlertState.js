import React, { useReducer } from 'react';

import alertContext from './AlertContext';
import alertReducer from './AlertRedcuer';

import { SET_ALERT, CLEAR_ALERT } from '../types';

const Alertstate = ({ children }) => {
	const initialState = {
		message: null,
		status: null,
	};

	const [state, dispatch] = useReducer(alertReducer, initialState);

	const setAlert = (message, code) => {
		dispatch({
			type: SET_ALERT,
			payload: { message, code },
		});
		setTimeout(() => {
			clearAlert();
		}, 5000);
	};

	const clearAlert = () => {
		dispatch({
			type: CLEAR_ALERT,
		});
	};

	return (
		<alertContext.Provider
			value={{
				message: state.message,
				status: state.status,
				setAlert,
				clearAlert,
			}}
		>
			{children}
		</alertContext.Provider>
	);
};

export default Alertstate;

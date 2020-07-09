import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import alertContext from './AlertContext';
import alertReducer from './AlertRedcuer';

import { SET_ALERT, CLEAR_ALERT } from '../types';

const Alertstate = ({ children }) => {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	const setAlert = (message, status, clearTimeoutDuration = 5000) => {
		const id = uuidv4();
		dispatch({
			type: SET_ALERT,
			payload: { message, status, id },
		});
		setTimeout(() => {
			clearAlert(id);
		}, clearTimeoutDuration);
	};

	const clearAlert = (id) => {
		dispatch({
			type: CLEAR_ALERT,
			payload: id,
		});
	};

	return (
		<alertContext.Provider
			value={{
				alerts: state,
				setAlert,
				clearAlert,
			}}
		>
			{children}
		</alertContext.Provider>
	);
};

export default Alertstate;

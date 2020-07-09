import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import { REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import AlertContext from '../alert/AlertContext';

import { API } from '../../config/config';

const AuthState = ({ children }) => {
	const initialState = {
		data: null,
	};

	const alertContext = useContext(AlertContext);

	const [state, dispatch] = useReducer(AuthReducer, initialState);
	const { setAlert } = alertContext;

	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post(
				`${API}/auth/register`,
				formData,
				config,
			);
			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: response.data,
			});
			setAlert('User successfully registered', 0);
		} catch (error) {
			dispatch({
				type: REGISTER_USER_FAILURE,
			});
			setAlert(error.response.data.error, 1);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				data: state.data,
				register,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;

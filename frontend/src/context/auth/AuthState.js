import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILURE,
} from '../types';
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

			if (error.response !== undefined) {
				setAlert(error.response.data.error, 1);
			} else {
				setAlert('Failed to connect to server', 1);
			}
		}
	};

	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post(`${API}/auth/login`, formData, config);
			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: response.data,
			});
			setAlert('Welcome to our shop', 0);
		} catch (error) {
			dispatch({
				type: LOGIN_USER_FAILURE,
			});

			if (error.response !== undefined) {
				setAlert(error.response.data.error, 1);
			} else {
				setAlert('Failed to connect to server', 1);
			}
		}
	};

	const getProfileData = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.get(`${API}/auth/`, config);
			dispatch({
				type: FETCH_USER_PROFILE_SUCCESS,
				payload: response.data,
			});
			setAlert('Profile information fetched successfully', 0);
		} catch (error) {
			dispatch({
				type: FETCH_USER_PROFILE_FAILURE,
			});

			if (error.response !== undefined) {
				setAlert(error.response.data.error, 1);
			} else {
				setAlert('Failed to connect to server', 1);
			}
		}
	};

	return (
		<AuthContext.Provider
			value={{
				data: state.data,
				register,
				login,
				getProfileData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;

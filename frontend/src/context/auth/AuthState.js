import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOAD_USER_FAILURE,
	LOAD_USER_SUCCESS,
	LOGOUT_USER,
} from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import AlertContext from '../alert/AlertContext';

import { API } from '../../config/config';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = ({ children }) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: false,
		user: null,
	};

	const alertContext = useContext(AlertContext);

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const { setAlert } = alertContext;
	let history = useHistory();

	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get(`${API}/auth`);
			dispatch({
				type: LOAD_USER_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: LOAD_USER_FAILURE });
		}
	};

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
			history.push('/');
			loadUser();
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
			history.push('/');
			loadUser();
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

	const logOut = () => {
		localStorage.removeItem('token');
		dispatch({ type: LOGOUT_USER });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				register,
				login,
				loadUser,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;

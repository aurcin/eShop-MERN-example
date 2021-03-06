import {
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	LOAD_USER_SUCCESS,
	LOGOUT_USER,
	LOAD_USER_FAILURE,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAILURE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_USER_SUCCESS:
		case REGISTER_USER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: true,
				user: null,
			};
		case UPDATE_PASSWORD_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
			};

		case LOGIN_USER_FAILURE:
		case REGISTER_USER_FAILURE:
		case LOGOUT_USER:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};

		case LOAD_USER_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				user: action.payload.data,
				isAuthenticated: true,
				loading: false,
			};

		case LOAD_USER_FAILURE:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loading: false,
			};

		case UPDATE_PROFILE_FAILURE:
		case UPDATE_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

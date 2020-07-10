import {
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	LOAD_USER_SUCCESS,
	LOGOUT_USER,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_USER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false,
			};
		case LOAD_USER_SUCCESS:
			return {
				...state,
				user: action.payload.data,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_USER_FAILURE:
			return {
				...state,
				data: null,
			};

		case LOGOUT_USER: {
			return {
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		}

		default:
			return state;
	}
};

import {
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILURE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				data: action.payload,
			};
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				data: action.payload,
			};

		case FETCH_USER_PROFILE_SUCCESS:
			return {
				...state,
				data: action.payload,
			};
		case REGISTER_USER_FAILURE:
			return {
				...state,
				data: null,
			};
		case LOGIN_USER_FAILURE:
			return {
				...state,
				data: null,
			};

		case FETCH_USER_PROFILE_FAILURE:
			return {
				...state,
				data: null,
			};
		default:
			return state;
	}
};

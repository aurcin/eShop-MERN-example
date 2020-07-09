import { REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				data: action.payload,
			};
		case REGISTER_USER_FAILURE:
			return {
				...state,
				data: null,
			};
		default:
			return state;
	}
};

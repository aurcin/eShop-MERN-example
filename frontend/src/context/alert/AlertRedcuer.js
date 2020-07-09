import { SET_ALERT, CLEAR_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				message: action.payload.message,
				status: action.payload.status,
			};
		case CLEAR_ALERT:
			return {
				message: null,
				status: null,
			};
		default:
			return state;
	}
};

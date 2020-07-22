import { CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE } from '../types';

export default (state, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_SUCCESS: {
			return {
				...state,
			};
		}
		case CREATE_PRODUCT_FAILURE: {
			return {
				...state,
			};
		}
		default:
			return state;
	}
};

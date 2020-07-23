import {
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
	LOAQD_NEWEST_PRODUCT_SUCCESS,
	LOAQD_NEWEST_PRODUCT_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	UPLOAD_PHOTO_FAILURE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_SUCCESS:
			return {
				...state,
				newest: [action.payload.data, ...state.newest],
			};

		case LOAQD_NEWEST_PRODUCT_SUCCESS:
			return {
				...state,
				newest: [...action.payload.data],
			};

		case CREATE_PRODUCT_FAILURE:
		case UPLOAD_PHOTO_FAILURE:
		case UPLOAD_PHOTO_SUCCESS:
			return {
				...state,
			};
		case LOAQD_NEWEST_PRODUCT_FAILURE:
			return {
				...state,
				newest: [],
			};

		default:
			return state;
	}
};

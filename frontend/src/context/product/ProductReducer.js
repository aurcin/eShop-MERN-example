import {
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
	LOAD_NEWEST_PRODUCT_SUCCESS,
	LOAD_NEWEST_PRODUCT_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	UPLOAD_PHOTO_FAILURE,
	LOAD_POPULAR_PRODUCT_SUCCESS,
	LOAD_POPULAR_PRODUCT_FAILURE,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case CREATE_PRODUCT_SUCCESS:
			return {
				...state,
				newest: [action.payload.data, ...state.newest],
				products: [action.payload.data, ...state.products],
			};

		case LOAD_NEWEST_PRODUCT_SUCCESS:
			return {
				...state,
				newest: [...action.payload.data],
			};
		case LOAD_POPULAR_PRODUCT_SUCCESS:
			return {
				...state,
				popular: [...action.payload.data],
			};
		case FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				products: [...action.payload.data],
				paginator: action.payload.pagination,
			};
		case CREATE_PRODUCT_FAILURE:
		case UPLOAD_PHOTO_FAILURE:
		case UPLOAD_PHOTO_SUCCESS:
			return {
				...state,
			};
		case LOAD_NEWEST_PRODUCT_FAILURE:
			return {
				...state,
				newest: [],
			};
		case LOAD_POPULAR_PRODUCT_FAILURE:
			return {
				...state,
				popular: [],
			};
		case FETCH_PRODUCTS_FAILURE:
			return {
				...state,
				products: [],
				paginator: {},
			};
		default:
			return state;
	}
};

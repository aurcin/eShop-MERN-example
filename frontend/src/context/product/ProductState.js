import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
	LOAD_NEWEST_PRODUCT_SUCCESS,
	LOAD_NEWEST_PRODUCT_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	UPLOAD_PHOTO_FAILURE,
	LOAD_POPULAR_PRODUCT_FAILURE,
	LOAD_POPULAR_PRODUCT_SUCCESS,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
} from '../types';

import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import AlertContext from '../alert/AlertContext';

import { API } from '../../config/config';

const ProductState = ({ children }) => {
	const initialState = {
		newest: [],
		popular: [],
		products: [],
		paginator: {},
	};

	const alertContext = useContext(AlertContext);

	const [state, dispatch] = useReducer(ProductReducer, initialState);

	const { setAlert } = alertContext;

	const loadNewest = async (count = 1) => {
		try {
			const res = await axios.get(
				`${API}/products?sort=-createdAt&limit=${count}`,
			);
			dispatch({
				type: LOAD_NEWEST_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: LOAD_NEWEST_PRODUCT_FAILURE });
			setAlert('Failed to load newest products', 1);
		}
	};

	const loadProducts = async (params = 'sort=-createdAt') => {
		try {
			const res = await axios.get(`${API}/products?${params}`);
			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: FETCH_PRODUCTS_FAILURE });
			setAlert('Failed to load products', 1);
		}
	};

	const loadPopular = async (count = 1) => {
		try {
			const res = await axios.get(`${API}/products?sort=-sold&limit=${count}`);
			dispatch({
				type: LOAD_POPULAR_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: LOAD_POPULAR_PRODUCT_FAILURE });
			setAlert('Failed to load popular products', 1);
		}
	};

	const createProduct = async (formData, photo) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const hasPhoto = formData.photo;
		formData.photo = undefined;

		try {
			const response = await axios.post(`${API}/products/`, formData, config);

			if (hasPhoto !== null) {
				await axios.put(
					`${API}/products/${response.data.data._id}/photo`,
					photo,
				);
			}

			dispatch({
				type: CREATE_PRODUCT_SUCCESS,
				payload: response.data,
			});

			setAlert('Product created!', 0);
		} catch (error) {
			dispatch({
				type: CREATE_PRODUCT_FAILURE,
			});

			if (error.response !== undefined) {
				setAlert(error.response.data.error, 1);
			} else {
				setAlert('Failed to connect to server', 1);
			}
		}
	};

	const uploadPhoto = async (photo) => {
		try {
			await axios.put(`${API}/products/5f18e24cf00f9a1d68bc8d9b/photo`, photo);
			dispatch({
				type: UPLOAD_PHOTO_SUCCESS,
			});
			setAlert('Photo uploaded!');
		} catch (error) {
			dispatch({
				type: UPLOAD_PHOTO_FAILURE,
			});
			setAlert('Failed to upload photo');
		}
	};

	return (
		<ProductContext.Provider
			value={{
				newest: state.newest,
				popular: state.popular,
				products: state.products,
				paginator: state.paginator,
				createProduct,
				loadNewest,
				loadPopular,
				uploadPhoto,
				loadProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;

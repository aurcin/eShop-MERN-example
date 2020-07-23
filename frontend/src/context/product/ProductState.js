import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import {
	CREATE_PRODUCT_SUCCESS,
	CREATE_PRODUCT_FAILURE,
	LOAQD_NEWEST_PRODUCT_SUCCESS,
	LOAQD_NEWEST_PRODUCT_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	UPLOAD_PHOTO_FAILURE,
} from '../types';

import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import AlertContext from '../alert/AlertContext';

import { API } from '../../config/config';

const ProductState = ({ children }) => {
	const initialState = {
		newest: [],
	};

	const alertContext = useContext(AlertContext);

	const [state, dispatch] = useReducer(ProductReducer, initialState);

	const { setAlert } = alertContext;

	const loadNewest = async () => {
		try {
			const res = await axios.get(`${API}/products?sort=-createdAt&limit=6`);
			dispatch({
				type: LOAQD_NEWEST_PRODUCT_SUCCESS,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: LOAQD_NEWEST_PRODUCT_FAILURE });
			setAlert('Failed to load newest products', 1);
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
				createProduct,
				loadNewest,
				uploadPhoto,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;

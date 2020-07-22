import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import { CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE } from '../types';

import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import AlertContext from '../alert/AlertContext';

import { API } from '../../config/config';

const ProductState = ({ children }) => {
	const initialState = {};

	const alertContext = useContext(AlertContext);

	const [state, dispatch] = useReducer(ProductReducer, initialState);

	const { setAlert } = alertContext;

	const createProduct = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.post(`${API}/products/`, formData, config);

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

	return (
		<ProductContext.Provider
			value={{
				createProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;

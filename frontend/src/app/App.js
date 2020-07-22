import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AlertState from '../context/alert/AlertState';
import AuthState from '../context/auth/AuthState';
import ProductState from '../context/product/ProductState';

import Header from './components/layout/header';
import Main from './components/layout/main';
import Footer from './components/layout/footer';
import Alert from './components/alet';

import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<BrowserRouter>
			<AlertState>
				<AuthState>
					<ProductState>
						<Header />
						<Main />
						<Footer />
					</ProductState>
				</AuthState>
				<Alert />
			</AlertState>
		</BrowserRouter>
	);
};

export default App;

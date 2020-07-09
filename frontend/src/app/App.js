import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AlertState from '../context/alert/AlertState';
import AuthState from '../context/auth/AuthState';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Alert from './components/alet';

function App() {
	return (
		<AlertState>
			<AuthState>
				<BrowserRouter>
					<Header />
					<Main />
					<Footer />
				</BrowserRouter>
			</AuthState>

			<Alert />
		</AlertState>
	);
}

export default App;

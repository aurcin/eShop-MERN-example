import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Main />
			<Footer />
		</BrowserRouter>
	);
}

export default App;

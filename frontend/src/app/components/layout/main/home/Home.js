import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Newest from '../../../products/newest';
import Popular from '../../../products/popular';

const Home = () => {
	return (
		<>
			<Jumbotron>
				<h1>Welcome to E-SHOP</h1>
				<p>
					Here u can choose from large assortiment of books in paper or audio
					formats
				</p>
			</Jumbotron>
			<Newest />
			<Popular />
		</>
	);
};

export default Home;

import React, { useContext, useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import ProductContext from '../../../../context/product/ProductContext';

import ListItem from '../ListItem';

const Popular = () => {
	const productContext = useContext(ProductContext);
	const { popular, loadPopular } = productContext;

	useEffect(() => {
		if (popular.length === 0) {
			loadPopular(3);
		}
		// eslint-disable-next-line
	}, []);

	const List = popular.map(({ _id, name, price, photo }) => (
		<ListItem key={_id} name={name} price={price} photo={photo} />
	));

	return (
		<>
			<h2 className='mb-5'>Our most popular products!</h2>
			<CardDeck>{List}</CardDeck>
		</>
	);
};

export default Popular;

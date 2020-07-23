import React, { useContext, useEffect } from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import ProductContext from '../../../../context/product/ProductContext';

import ListItem from '../ListItem';

const Newest = () => {
	const productContext = useContext(ProductContext);
	const { newest, loadNewest } = productContext;

	useEffect(() => {
		if (newest.length === 0) {
			loadNewest();
		}
		// eslint-disable-next-line
	}, []);

	const List = newest.map(({ _id, name, price, photo }) => (
		<ListItem key={_id} name={name} price={price} photo={photo} />
	));

	return (
		<>
			<h2 className='mb-5'>Our newest products!</h2>
			<CardDeck>{List}</CardDeck>
		</>
	);
};

export default Newest;

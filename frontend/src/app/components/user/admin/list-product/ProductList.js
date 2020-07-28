import React, { useContext, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import ProductContext from '../../../../../context/product/ProductContext';
import ListItem from './ListItem';
import Filter from '../../../products/filter';

const ProductList = () => {
	const productContext = useContext(ProductContext);

	const { products, loadProducts, paginator } = productContext;

	const productList = products.map(({ _id, name, category }) => (
		<ListItem key={_id} name={name} id={_id} category={category} />
	));

	return (
		<>
			<Filter
				onFilter={loadProducts}
				page={1}
				limit={10}
				paginator={paginator}
			/>
			<ListGroup>{productList}</ListGroup>
		</>
	);
};

export default ProductList;

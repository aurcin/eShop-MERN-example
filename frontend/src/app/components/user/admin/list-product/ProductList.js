import React, { useContext, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

import ProductContext from '../../../../../context/product/ProductContext';
import ListItem from './ListItem';

const ProductList = () => {
	const productContext = useContext(ProductContext);

	const { products, loadProducts, paginator } = productContext;
	let current = 1;
	if (paginator?.next) {
		current = paginator.next.page - 1;
	} else if (paginator?.prev) {
		current = paginator.prev.page + 1;
	}

	useEffect(() => {
		loadProductFiltered(1, 10);
		// eslint-disable-next-line
	}, []);

	const loadProductFiltered = (page, limit) => {
		loadProducts(
			`sort=-createdAt&select=name,category&limit=${limit}&page=${page}`,
		);
	};

	const renderPrev = () => {
		if (paginator?.prev) {
			return (
				<Pagination.Prev
					onClick={() => {
						loadProductFiltered(paginator.prev.page, paginator.prev.limit);
					}}
				/>
			);
		}
	};

	const renderNext = () => {
		if (paginator?.next) {
			return (
				<Pagination.Next
					onClick={() => {
						loadProductFiltered(paginator.next.page, paginator.next.limit);
					}}
				/>
			);
		}
	};

	const productList = products.map(({ _id, name, category }) => (
		<ListItem key={_id} name={name} id={_id} category={category} />
	));

	return (
		<>
			<ListGroup>{productList}</ListGroup>
			<style type='text/css'>
				{`
    .pagination {
      justify-content: center;
    }
    `}
			</style>
			<Pagination className='mt-3'>
				{renderPrev()}
				<Pagination.Item active>{current}</Pagination.Item>
				{renderNext()}
			</Pagination>
		</>
	);
};

export default ProductList;

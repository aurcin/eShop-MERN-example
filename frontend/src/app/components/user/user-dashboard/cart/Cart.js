import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const Cart = ({ history }) => {
	if (history === undefined || history?.length <= 0) {
		return (
			<>
				<h1>Purchase History</h1>
				<p>There is no purchases yet</p>
			</>
		);
	}

	const purchases = history.map((item) => (
		<ListGroup.Item>item</ListGroup.Item>
	));

	return (
		<>
			<h1>Purchase history</h1>
			<ListGroup>{purchases}</ListGroup>
		</>
	);
};

export default Cart;

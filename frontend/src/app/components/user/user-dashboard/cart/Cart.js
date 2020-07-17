import React from 'react';

const Cart = ({ history }) => {
	if (history === undefined || history?.length <= 0) {
		return <p>There is no purchases yet</p>;
	}

	return <div>list</div>;
};

export default Cart;

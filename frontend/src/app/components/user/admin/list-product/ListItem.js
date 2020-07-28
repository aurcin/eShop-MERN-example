import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ListItem = ({ name, category }) => {
	return (
		<ListGroup.Item variant='dark'>
			<Row>
				<Col xs={12} md={6}>
					{name}
				</Col>
				<Col xs={12} md={6}>
					{category}
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default ListItem;

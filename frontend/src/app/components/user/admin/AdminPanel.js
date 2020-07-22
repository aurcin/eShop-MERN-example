import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import AddProduct from './add-product';

const AdminPanel = () => {
	return (
		<Tab.Container id='list-group-tabs-example' defaultActiveKey='#add_product'>
			<Row>
				<Col sm={4}>
					<ListGroup>
						<ListGroup.Item action href='#add_product' variant='dark'>
							Add New Product
						</ListGroup.Item>
						<ListGroup.Item action href='#list_product' variant='dark'>
							List All
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						<Tab.Pane eventKey='#add_product'>
							<AddProduct />
						</Tab.Pane>
						<Tab.Pane eventKey='#list_product'>
							All product list goes here
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};
export default AdminPanel;

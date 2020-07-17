import React, { useContext } from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import AuthContext from '../../../../context/auth/AuthContext';

import Profile from './profile';
import Cart from './cart';
import Update from './update';

const UserDashboard = () => {
	const authContext = useContext(AuthContext);

	const { name, email, history } = authContext.user;

	return (
		<Tab.Container id='list-group-tabs-example' defaultActiveKey='#profile'>
			<Row>
				<Col sm={4}>
					<ListGroup>
						<ListGroup.Item action href='#profile' variant='dark'>
							Profile
						</ListGroup.Item>
						<ListGroup.Item action href='#cart' variant='dark'>
							Purchase History
						</ListGroup.Item>
						<ListGroup.Item action href='#updateprofile' variant='dark'>
							Update Profile
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						<Tab.Pane eventKey='#profile'>
							<Profile user={{ name, email }} />
						</Tab.Pane>
						<Tab.Pane eventKey='#cart'>
							<Cart history={history} />
						</Tab.Pane>
						<Tab.Pane eventKey='#updateprofile'>
							<Update />
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default UserDashboard;

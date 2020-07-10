import React from 'react';
import { withRouter } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const isActive = (history, path) => {
	return history.location.pathname === path;
};

const Menu = ({ history }) => {
	return (
		<>
			<Nav as='ul'>
				<Nav.Item as='li'>
					<LinkContainer to='/product1'>
						<Nav.Link active={isActive(history, '/product1')}>
							Product 1
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item as='li'>
					<LinkContainer to='/product2'>
						<Nav.Link active={isActive(history, '/product2')}>
							Product 2
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>
			</Nav>
		</>
	);
};

export default withRouter(Menu);

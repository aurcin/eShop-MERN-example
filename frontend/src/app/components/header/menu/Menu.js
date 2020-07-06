import React from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const isActive = (history, path) => {
	return history.location.pathname === path;
};

const Menu = ({ history }) => {
	return (
		<Navbar expand='lg' bg='dark' variant='dark' collapseOnSelect>
			<LinkContainer to='/'>
				<Navbar.Brand>E-SHOP</Navbar.Brand>
			</LinkContainer>

			<Navbar.Toggle aria-controls='main-navigation' />

			<Navbar.Collapse id='main-navigation' className='justify-content-end'>
				<Nav as='ul'>
					<Nav.Item as='li'>
						<LinkContainer to='/signin'>
							<Nav.Link active={isActive(history, '/signin')}>Sign In</Nav.Link>
						</LinkContainer>
					</Nav.Item>

					<Nav.Item as='li'>
						<LinkContainer to='/signup'>
							<Nav.Link active={isActive(history, '/signup')}>Sign Up</Nav.Link>
						</LinkContainer>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default withRouter(Menu);

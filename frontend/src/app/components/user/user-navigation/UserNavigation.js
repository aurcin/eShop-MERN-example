import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import AuthContext from '../../../../context/auth/AuthContext';

const isActive = (history, path) => {
	return history.location.pathname === path;
};

const UserNavigation = ({ history }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, loadUser, logOut } = authContext;

	useEffect(() => {
		loadUser();
	}, []);

	const renderForUnauthorised = () => {
		return (
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
		);
	};

	const renderForUser = () => {
		return (
			<Nav as='ul'>
				<Nav.Item as='li'>
					<LinkContainer to='/profile'>
						<Nav.Link active={isActive(history, '/profile')}>Profile</Nav.Link>
					</LinkContainer>
				</Nav.Item>
				<Nav.Item as='li'>
					<Button variant='dark' type='button' onClick={() => logOut()}>
						Logout
					</Button>
				</Nav.Item>
			</Nav>
		);
	};

	return isAuthenticated ? renderForUser() : renderForUnauthorised();
};

export default withRouter(UserNavigation);

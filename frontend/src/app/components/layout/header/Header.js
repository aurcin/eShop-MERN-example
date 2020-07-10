import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

import Menu from './menu';
import UserNavigation from '../../user/user-navigation';

const header = () => {
	return (
		<Navbar expand='lg' bg='dark' variant='dark' collapseOnSelect>
			<LinkContainer to='/'>
				<Navbar.Brand>E-SHOP</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls='main-navigation' />

			<Navbar.Collapse id='main-navigation' className='justify-content-end'>
				<Menu />
				<UserNavigation />
			</Navbar.Collapse>
		</Navbar>
	);
};

export default header;

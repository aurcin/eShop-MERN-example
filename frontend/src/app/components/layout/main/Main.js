import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import SignUp from '../../user/sign-up';
import SignIn from '../../user/sign-in';
import Home from './home';
import Profile from '../../user/profile';
import PrivateRoute from '../../routing/PrivateRoute';

const Routes = () => {
	return (
		<Container className='mt-5'>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/signin' exact component={SignIn} />
				<Route path='/signup' exact component={SignUp} />
				<PrivateRoute path='/profile' exact component={Profile} />
			</Switch>
		</Container>
	);
};

export default Routes;

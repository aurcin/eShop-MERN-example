import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignUp from './user/sign-up';
import SignIn from './user/sign-in';
import Home from './home';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/signin' exact component={SignIn} />
				<Route path='/signup' exact component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;

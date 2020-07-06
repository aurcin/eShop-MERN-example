import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../../pages/main';
import SignUp from '../../pages/user/sign-up';
import SignIn from '../../pages/user/sign-in';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Main} />
				<Route path='/signin' exact component={SignIn} />
				<Route path='/signup' exact component={SignUp} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;

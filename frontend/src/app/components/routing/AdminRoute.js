import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../../../context/auth/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, user, loading } = authContext;

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? (
					<Redirect to='/signin' />
				) : user.role !== 'admin' ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		></Route>
	);
};

export default AdminRoute;

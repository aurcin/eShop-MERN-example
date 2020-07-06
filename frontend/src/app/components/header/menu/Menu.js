import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return { color: '#ff9900' };
	}
	return { color: '#000000' };
};

const Menu = ({ history }) => {
	return (
		<ul>
			<li>
				<Link to='/' style={isActive(history, '/')}>
					Home
				</Link>
			</li>
			<li>
				<Link to='/signin' style={isActive(history, '/signin')}>
					Sign In
				</Link>
			</li>
			<li>
				<Link to='/signup' style={isActive(history, '/signup')}>
					Sign Up
				</Link>
			</li>
		</ul>
	);
};

export default withRouter(Menu);

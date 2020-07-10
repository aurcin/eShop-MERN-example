import React, { useContext } from 'react';

import AuthContext from '../../../../context/auth/AuthContext';

const Profile = () => {
	const authContext = useContext(AuthContext);

	const { user } = authContext;

	return (
		<div>
			<p>name </p>
			<p>email</p>
		</div>
	);
};

export default Profile;

import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../../../../context/auth/AuthContext';

const Profile = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
	});

	const authContext = useContext(AuthContext);

	const { name, email } = user;
	const { getProfileData } = authContext;

	useEffect(() => {
		getProfileData();
	}, []);

	return (
		<div>
			<p>{name}</p>
			<p>{email}</p>
		</div>
	);
};

export default Profile;

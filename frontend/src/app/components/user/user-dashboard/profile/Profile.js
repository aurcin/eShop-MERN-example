import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const Profile = ({ user: { name, email } }) => {
	return (
		<ListGroup>
			<ListGroup.Item>Name: {name}</ListGroup.Item>
			<ListGroup.Item>Email: {email}</ListGroup.Item>
		</ListGroup>
	);
};

export default Profile;

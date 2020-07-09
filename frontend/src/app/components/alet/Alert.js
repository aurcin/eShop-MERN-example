import React, { useContext } from 'react';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import AlertContext from '../../../context/alert/AlertContext';

const AlertWindow = () => {
	const alertContext = useContext(AlertContext);
	const { message, status, clearAlert } = alertContext;

	const getStatus = () => {
		return status === 1 ? 'danger' : 'info';
	};

	if (!message) {
		return <></>;
	}

	return (
		<Container>
			<Alert variant={getStatus()} dismissible onClose={clearAlert}>
				{message}
			</Alert>
		</Container>
	);
};

export default AlertWindow;

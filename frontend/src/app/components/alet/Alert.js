import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';

import AlertContext from '../../../context/alert/AlertContext';
import AlertItem from './AlertItem';

const AlertWindow = () => {
	const alertContext = useContext(AlertContext);
	const { alerts, clearAlert } = alertContext;

	const getStatus = (status) => {
		return status === 1 ? 'danger' : 'info';
	};

	if (!alerts || alerts.length === 0) {
		return <></>;
	}

	const AlertList = alerts.map(({ id, status, message }) => {
		return (
			<AlertItem
				key={id}
				variant={getStatus(status)}
				message={message}
				onClose={() => clearAlert(id)}
			/>
		);
	});

	return <Container>{AlertList}</Container>;
};

export default AlertWindow;

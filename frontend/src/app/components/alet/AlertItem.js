import React from 'react';

import Alert from 'react-bootstrap/Alert';

const AlertItem = ({ message, variant, onClose }) => {
	return (
		<Alert variant={variant} dismissible onClose={onClose}>
			{message}
		</Alert>
	);
};

export default AlertItem;

import React from 'react';
import { PUBLIC_FOLDER } from '../../../../config/config';

import Card from 'react-bootstrap/Card';

const ListItem = ({ name, price, photo }) => {
	return (
		<>
			<Card
				className='mb-3'
				bg='secondary'
				border='warning'
				text='light'
				style={{ minWidth: '18rem' }}
			>
				<Card.Img
					variant='top'
					src={`${PUBLIC_FOLDER}${photo}`}
					alt='book cover'
				/>
				<Card.Body>
					<Card.Title>{name}</Card.Title>

					<Card.Subtitle>{price}€</Card.Subtitle>
				</Card.Body>
			</Card>
		</>
	);
};

export default ListItem;

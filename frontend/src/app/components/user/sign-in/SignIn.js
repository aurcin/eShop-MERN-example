import React, { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthContext from '../../../../context/auth/AuthContext';

const SingIn = () => {
	const [formFields, setFormFields] = useState({
		email: '',
		password: '',
	});

	const authContext = useContext(AuthContext);

	const { email, password } = formFields;
	const { login } = authContext;

	const onSubmit = (e) => {
		e.preventDefault();
		login(formFields);
	};

	const onChange = (field) => (e) => {
		setFormFields({
			...formFields,
			[field]: e.target.value,
		});
	};

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }}>
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='formEmail'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							placeholder='email@mail.com'
							onChange={onChange('email')}
							value={email}
							required
						/>
					</Form.Group>

					<Form.Group controlId='formPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							onChange={onChange('password')}
							value={password}
							required
							pattern='.{6,}'
							title='Password must be at least 6 characters long'
						/>
						<Form.Text className='text-muted'>
							Must be at least 6 characters long.
						</Form.Text>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default SingIn;

import React, { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthContext from '../../../../../context/auth/AuthContext';

const SignUp = () => {
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
	});

	const authContext = useContext(AuthContext);

	const { name, email, password } = formFields;
	const { register } = authContext;

	const onSubmit = (e) => {
		e.preventDefault();
		register(formFields);
	};

	const onChange = (field) => (e) => {
		setFormFields({
			...formFields,
			[field]: e.target.value,
		});
	};

	return (
		<>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Form onSubmit={onSubmit}>
						<Form.Group controlId='formName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='John'
								onChange={onChange('name')}
								value={name}
								required
								pattern='.{1,32}'
								title='Name cannot extend 32 symbols'
							/>
						</Form.Group>

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
		</>
	);
};

export default SignUp;

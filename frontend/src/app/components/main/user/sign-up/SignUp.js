import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { API } from '../../../../../config/config';

const SignUp = () => {
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
		success: true,
		error: null,
	});

	const { name, email, password, success, error } = formFields;

	const onSubmit = (e) => {
		e.preventDefault();
		signUp({ name, email, password }).then((data) => {
			if (!data.success) {
				setFormFields({
					...formFields,
					error: data.error || 'Error',
					success: false,
				});
			} else {
				setFormFields({
					name: '',
					email: '',
					password: '',
					success: true,
					error: null,
				});
			}
		});
	};

	const onChange = (field) => (e) => {
		setFormFields({
			...formFields,
			[field]: e.target.value,
		});
	};

	const signUp = (user) => {
		return fetch(`${API}/auth/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				return response.json();
			})
			.catch((error) => {
				console.log(error);
				return error.json();
			});
	};

	const showError = () => {
		return <div>Error</div>;
	};

	const showSuccess = () => {
		return <div>success</div>;
	};

	return (
		<>
			{error !== null ? showError() : null}
			{success ? showSuccess() : null}

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

import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignUp = () => {
	const [formfields, setFormFields] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formfields);
	};

	const onChange = (field) => (e) => {
		setFormFields({
			...formfields,
			[field]: e.target.value,
		});
	};

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }}>
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='formName'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='John'
							onChange={onChange('name')}
							value={formfields.name}
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
							value={formfields.email}
							required
						/>
					</Form.Group>

					<Form.Group controlId='formPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							onChange={onChange('password')}
							value={formfields.password}
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

export default SignUp;

import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AuthContext from '../../../../../context/auth/AuthContext';
import AlertContext from '../../../../../context/alert/AlertContext';

const Update = () => {
	const [formFields, setFormFields] = useState({
		name: '',
		email: '',
		currentPassword: '',
		newPassword: '',
		newPassword2: '',
	});

	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const {
		name,
		email,
		currentPassword,
		newPassword,
		newPassword2,
	} = formFields;
	const { updateProfile, updatePassword, isAuthenticated, user } = authContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		setFormFields({
			name: user.name,
			email: user.email,
		});
		//eslint-disable-next-line
	}, []);

	const onUpdateDetails = (e) => {
		e.preventDefault();
		updateProfile({ name, email });
	};

	const onUpdatePassword = (e) => {
		e.preventDefault();
		if (newPassword === newPassword2) {
			updatePassword({ currentPassword, newPassword });
		} else {
			setAlert('New Password must match new password repeat', 1);
		}
		setFormFields({
			newPassword: '',
			newPassword2: '',
			currentPassword: '',
		});
	};

	const onChange = (field) => (e) => {
		setFormFields({
			...formFields,
			[field]: e.target.value,
		});
	};

	if (!isAuthenticated) {
		return <Redirect to='/signin' />;
	}

	return (
		<>
			<h1>Update Profile</h1>
			<h2>Details</h2>
			<Form onSubmit={onUpdateDetails}>
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

				<Button variant='primary' type='submit'>
					Update Details
				</Button>
			</Form>
			<h2 className='mt-5'>Password</h2>
			<Form onSubmit={onUpdatePassword}>
				<Form.Group controlId='formPasswordCurrent'>
					<Form.Label>Current Password</Form.Label>
					<Form.Control
						type='password'
						onChange={onChange('currentPassword')}
						value={currentPassword}
						required
						pattern='.{6,}'
						title='Password must be at least 6 characters long'
					/>
				</Form.Group>

				<Form.Group controlId='formPasswordNew'>
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type='password'
						onChange={onChange('newPassword')}
						value={newPassword}
						required
						pattern='.{6,}'
						title='Password must be at least 6 characters long'
					/>
				</Form.Group>

				<Form.Group controlId='formPasswordNew2'>
					<Form.Label>New Password Repeat</Form.Label>
					<Form.Control
						type='password'
						onChange={onChange('newPassword2')}
						value={newPassword2}
						required
						pattern='.{6,}'
						title='Password must be at least 6 characters long'
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Update Password
				</Button>
			</Form>
		</>
	);
};

export default Update;

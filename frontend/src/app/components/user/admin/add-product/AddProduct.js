import React, { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ProductContext from '../../../../../context/product/ProductContext';

const AddProduct = () => {
	const [formFields, setFormFields] = useState({
		category: 'books',
		name: '',
		description: '',
		price: '',
		quantity: '',
		shipping: false,
		photo: null,
	});
	const productContext = useContext(ProductContext);

	const { name, description, price, quantity, shipping, photo } = formFields;
	const { createProduct } = productContext;

	const onChange = (field) => (e) => {
		setFormFields({
			...formFields,
			[field]: e.target.value,
		});
	};

	const onCategorySelect = (e) => {
		setFormFields({
			...formFields,
			category: e.target.value,
		});
	};

	const onToggle = (field) => () => {
		setFormFields({
			...formFields,
			[field]: !formFields[field],
		});
	};

	const onPhotoSelect = (e) => {
		let files = e.target.files;

		if (files && files.length > 0) {
			setFormFields({
				...formFields,
				photo: files[0],
			});
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', photo);
		createProduct(formFields, data);
		setFormFields({
			...formFields,
			name: '',
			description: '',
			price: '',
			quantity: '',
			photo: null,
		});
	};

	return (
		<>
			<h1>Add new product</h1>
			<Form onSubmit={onSubmit}>
				<Form.Group controlId='name'>
					<Form.Label>Product Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Product name'
						onChange={onChange('name')}
						value={name}
						required
					/>
				</Form.Group>

				<Form.Group controlId='description'>
					<Form.Label>Product Description</Form.Label>
					<Form.Control
						as='textarea'
						placeholder='Product description'
						onChange={onChange('description')}
						value={description}
						required
					/>
				</Form.Group>

				<Form.Group controlId='category'>
					<Form.Label>Product Category</Form.Label>
					<Form.Control as='select' custom onChange={onCategorySelect}>
						<option value='books'>Books</option>
						<option value='journals'>Journals</option>
						<option value='audiobooks'>Audio Books</option>
						<option value='other'>Other</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='price'>
					<Form.Label>Product Price in euros € </Form.Label>
					<Form.Control
						type='number'
						placeholder='0'
						onChange={onChange('price')}
						value={price}
						min='0.01'
						step='0.01'
						required
					/>
				</Form.Group>

				<Form.Group controlId='quantity'>
					<Form.Label>Product quantity </Form.Label>
					<Form.Control
						type='number'
						placeholder='0'
						onChange={onChange('quantity')}
						value={quantity}
						min='0'
						step='1'
					/>
				</Form.Group>

				<Form.Group controlId='shipping'>
					<Form.Check
						type='checkbox'
						label='Shiping included?'
						defaultChecked={shipping}
						onChange={onToggle('shipping')}
					/>
				</Form.Group>

				<Form.Group>
					<Form.File
						id='photo'
						label='Product photo'
						onChange={onPhotoSelect}
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Add
				</Button>
			</Form>
		</>
	);
};

export default AddProduct;

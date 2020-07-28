import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

const Filter = ({ onFilter, page, limit, paginator }) => {
	const [filter, setFilter] = useState({
		name: '',
		category: '',
	});

	const { name, category } = filter;

	let current = 1;
	if (paginator?.next) {
		current = paginator.next.page - 1;
	} else if (paginator?.prev) {
		current = paginator.prev.page + 1;
	}

	useEffect(() => {
		onFilter(
			`sort=-createdAt&select=name,category&limit=${limit}&page=${page}`,
		);
		// eslint-disable-next-line
	}, []);

	const onKeywordChange = (e) => {
		setFilter({
			...filter,
			name: e.target.value,
		});
	};

	const onCategorySelect = (e) => {
		setFilter({
			...filter,
			category: e.target.value,
		});
	};

	const loadFiltered = (page, limit) => {
		let categoryString = '';
		if (category) {
			categoryString = `category=${category}&`;
		}
		onFilter(
			`${categoryString}keyword=${name}&sort=-createdAt&select=name,category&limit=${limit}&page=${page}`,
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		loadFiltered(page, limit);
	};

	const renderPrev = () => {
		if (paginator?.prev) {
			return (
				<Pagination.Prev
					onClick={() => {
						loadFiltered(paginator.prev.page, paginator.prev.limit);
					}}
				/>
			);
		}
	};

	const renderNext = () => {
		if (paginator?.next) {
			return (
				<Pagination.Next
					onClick={() => {
						loadFiltered(paginator.next.page, paginator.next.limit);
					}}
				/>
			);
		}
	};

	return (
		<>
			<Form onSubmit={onSubmit} className='mb-3'>
				<Form.Group controlId='name'>
					<Form.Label>Filter keyword</Form.Label>
					<Form.Control
						type='text'
						placeholder='Keyword'
						value={name}
						onChange={onKeywordChange}
					/>
				</Form.Group>

				<Form.Group controlId='category'>
					<Form.Label>Product Category</Form.Label>
					<Form.Control as='select' custom onChange={onCategorySelect}>
						<option value=''>All</option>
						<option value='books'>Books</option>
						<option value='journals'>Journals</option>
						<option value='audiobooks'>Audio Books</option>
						<option value='other'>Other</option>
					</Form.Control>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Filter
				</Button>
			</Form>

			<style type='text/css'>
				{`
    .pagination {
      justify-content: center;
    }
    `}
			</style>
			<Pagination className='mt-3'>
				{renderPrev()}
				<Pagination.Item>{current}</Pagination.Item>
				{renderNext()}
			</Pagination>
		</>
	);
};

export default Filter;

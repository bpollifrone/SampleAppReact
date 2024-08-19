import React from 'react';
import { render, screen } from '@testing-library/react';
import Edit from './Edit';
import { CustomersApi } from '../api/CustomersApi';

const mockedClient = {
  getCustomers: jest.fn(),
  getCustomer: jest.fn(() => { return {lastName: 'foo', phoneNumber: '8005551234'}; }),
  addCustomer: jest.fn(),
  editCustomer: jest.fn(),
  deleteCustomer: jest.fn(),
}

test('renders edit page', () => {
  render(<Edit id={1} client={mockedClient as unknown as CustomersApi}/>);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders add page', () => {
  render(<Edit client={mockedClient as unknown as CustomersApi}/>);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
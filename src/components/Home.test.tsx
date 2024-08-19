import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { CustomersApi } from '../api/CustomersApi';

const mockedClient = {
  getCustomers: jest.fn(() => [{lastName: 'foo', phoneNumber: '8005551234'}]),
  getCustomer: jest.fn(),
  addCustomer: jest.fn(),
  editCustomer: jest.fn(),
  deleteCustomer: jest.fn(),
}

test('renders home page', () => {
  render(<Home client={mockedClient as unknown as CustomersApi}/>);
  const linkElement = screen.getByText(/Add new/i);
  expect(linkElement).toBeInTheDocument();
});

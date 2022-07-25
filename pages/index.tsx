import type { NextPage } from 'next';
import React from 'react';

import { Customer } from '@prisma/client';
import CustomerComponent from '../components/Customer';
import { createCustomer, getCustomers } from './api-service';

import Header from '../components/Header';

const Home: NextPage = () => {
  let activated = false;
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [customer, setCustomer] = React.useState({
    name: '',
    email: '',
  });

  React.useEffect(() => {
    getCustomers()
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createCustomer(customer)
      .then((res) => res.json())
      .then((data) => {
        setCustomers((prev) => {
          return [...prev, data];
        });
      });
    setCustomer({
      name: '',
      email: '',
    });
  }

  if (customer.name && customer.email) activated = true;

  return (
    <>
      <Header></Header>
      <div className='customer-wrapper'>
        <div className='customer-list'>
          {customers.length === 0 ? (
            <div className='empty-list'>
              <h1>No customer yet, please create one :)</h1>
            </div>
          ) : (
            customers.map((customer) => (
              <CustomerComponent
                key={customer.id}
                id={customer.id}
                name={customer.name}
                email={customer.email}
                phone={customer.phoneNumber}
                customers={customers}
                setCustomers={setCustomers}
              ></CustomerComponent>
            ))
          )}
        </div>

        <div className='create-customer'>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Name</p>
              <input
                className='input-name'
                type='text'
                onChange={handleChange}
                name='name'
                value={customer.name}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                className='input-email'
                type='email'
                onChange={handleChange}
                name='email'
                value={customer.email}
              />
            </div>
            <button
              className={`create-customer-button ${
                activated ? '' : 'deactivated'
              }`}
            >
              Create Customer
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

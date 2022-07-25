import React, { Dispatch } from 'react';
import type { NextPage } from 'next';
import { Contract, Customer } from '@prisma/client';
import { createContract, putCustomer, getCustomer } from '../pages/api-service';
import ContractComponent from './ContractComponent';
import { InputField } from '../interfaces/interface';

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  customers: Customer[];
  setCustomers: Dispatch<React.SetStateAction<Customer[]>>;
}

const CustomerComponent: NextPage<CustomerProps> = (props) => {
  const [expand, setExpand] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState({ phone: '' });
  const [contractDetails, setContractDetails] = React.useState({});
  const [customerContracts, setCustomerContracts] = React.useState<Contract[]>(
    []
  );
  const [inputField, setInputField] = React.useState<InputField[]>([]);

  function addInputField() {
    setInputField((prev) => [
      ...prev,
      { type: 'text', value: '', placeholder: 'type' },
      { type: 'text', value: '', placeholder: 'value' },
    ]);
  }

  function handlePhoneNumberSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    putCustomer(props.id, phoneNumber.phone);
    props.setCustomers((prev: Customer[]) => {
      return prev.map((customer: Customer) => {
        if (customer.id === props.id) {
          customer.phoneNumber = phoneNumber.phone;
        }
        return customer;
      });
    });
    phoneNumber.phone = '';
  }

  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPhoneNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleContractChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const i = +name; // + infront of name turns name into Int
    setInputField((prev) => {
      const newArr = prev.slice();
      newArr[i].value = value;
      return newArr;
    });
  }

  function handleContractSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < inputField.length; i += 2) {
      let key = inputField[i].value;
      let value = inputField[i + 1].value;
      setContractDetails((prev) => ({
        ...prev,
        [`${key}`]: value,
      }));
    }
    setInputField([]);
  }

  React.useEffect(() => {
    if (Object.keys(contractDetails).length) {
      createContract(props.id, contractDetails)
        .then((res) => res.json())
        .then((contract) => {
          setCustomerContracts((prev) => [...prev, contract]);
        });
      setContractDetails({});
    }
  }, [props.id, contractDetails]);

  function show() {
    setExpand(true);
    getCustomer(props.id)
      .then((res) => res.json())
      .then((specificCustomer) =>
        setCustomerContracts(specificCustomer.contracts)
      );
  }

  function hide() {
    setExpand(false);
  }

  function reduceInputField(e: React.MouseEvent<HTMLButtonElement>, name: number) {
    console.log(name)
    setInputField(prev => {
      return prev.filter((field, i) => { 
        return (i !== name) && (i !== name - 1);
      })
    })
  }

  return (
    <section id='customer'>
      {expand ? (
        <>
          <div className='expand'>
            <h3>Name: {props.name}</h3>
            <button className='hide-button' onClick={hide}>
              hide
            </button>
          </div>
          <h3>Email: {props.email}</h3>
          <div className='phone-number-div'>
            <h3>Phone number: {props.phone}</h3>
            <form onSubmit={handlePhoneNumberSubmit}>
              <input
                className='phone-input'
                type='text'
                name='phone'
                value={phoneNumber.phone}
                onChange={handlePhoneNumberChange}
              />
              <button className='edit-phone-button'>
                {props.phone ? 'edit' : 'add a phone number'}
              </button>
            </form>
          </div>
          <div className='create-contract-wrapper'>
            <h3>Add contract detail about insured house: </h3>
            <button className='add-detail-button' onClick={addInputField}>
              add detail
            </button>
          </div>

          <form onSubmit={handleContractSubmit}>
            <div className='input-field-wrapper'>
              {inputField.map((item, i) => (
                <>
                  <input
                    className='contract-input-field'
                    key={i}
                    type={item.type}
                    name={`${i}`}
                    value={inputField[i].value}
                    placeholder={item.placeholder}
                    onChange={handleContractChange}
                  />

                  {/* the button only refers to odd-indexed field because of the grid we set */}
                  {/* first field is 'type', then ':' then 'value' field only we have the button that comes after 'value' placeholder */}
                  {item.placeholder === 'type' ? ':' : <button className='reduce-detail-button' type='button' onClick={(e) => reduceInputField(e, i)}>-</button>}
                </>
              ))}
            </div>
            {inputField.every((field) => field.value !== '') && (
              <button
                className={`${
                  inputField.length ? 'submit-contract-button' : 'hide'
                }`}
              >
                submit contract
              </button>
            )}
          </form>
            {customerContracts.map((contract, i) => (
              <ContractComponent
                key={contract.id}
                id={contract.id}
                i={i + 1}
                contractDetails={contract.contractDetails}  
              />
            ))}
        </>
      ) : (
        <div className='expand'>
          <h3>Customer: {props.name}</h3>
          <button className='show-button' onClick={show}>
            show
          </button>
        </div>
      )}
    </section>
  );
};

export default CustomerComponent;

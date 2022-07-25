import { Customer, ContractDetails } from "../interfaces/interface";

/* GET ALL CUSTOMERS */
export const getCustomers = () => {
  return fetch('/api/customer', {
    method: 'GET',
  });
};

/* CREATE A NEW CUSTOMER */
export const createCustomer = (customer: Customer) => {
  return fetch('/api/customer', {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

/* UPDATE SPECIFIC CUSTOMER'S PHONE NUMBER */
export const putCustomer = (customerId: String, phoneNumber: String) => {
  return fetch(`/api/customer/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify( {phoneNumber: phoneNumber} ),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/* GET SPECIFIC CUSTOMER */
export const getCustomer = (customerId: String) => {
  return fetch(`/api/customer/${customerId}`, {
    method: 'GET'
  })
}

/* CREATE SINGLE CONTRACT */
export const createContract = (customerId: String, contractDetails: ContractDetails) => {
  return fetch(`/api/contract`, {
    method: 'POST',
    body: JSON.stringify({customerId, contractDetails}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/* GET ALL CONTRACTS */
export const getContracts = () => {
  return fetch(`/api/contract`, {
    method: 'GET',
  })
};

/* UPDATE SPECIFIC CONTRACT */
export const putContract = (contractId: string, contractDetails: ContractDetails) => {
  return fetch(`/api/contract/${contractId}`, {
    method: 'PUT',
    body: JSON.stringify({contractDetails}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/* GET SPEICIFIC CONTRACT */
export const getContract = (contractId: String) => {
  return fetch(`/api/contract/${contractId}`, {
    method: 'GET'
  });
}
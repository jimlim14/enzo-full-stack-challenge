export interface Customer {
  id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface ContractDetails {}

export interface CustomerId {
  customerId: string;
  prevState: null;
}

export interface InputField {
  type?: string;
  id?: number;
  name?: string;
  value?: string;
  placeholder?: string;
}

export interface ContractProps {
  id: string;
  i: number;
  contractDetails: ContractDetails | null;
}
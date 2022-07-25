import React from 'react';
import { NextPage } from 'next';
import { getContract, putContract } from '../pages/api-service';
import { ContractProps } from '../interfaces/interface';

const ContractComponent: NextPage<ContractProps> = (props) => {
  const [expandEdit, setExpandEdit] = React.useState(false);
  const [expandContract, setExpandContract] = React.useState(false);
  const [contractDetails, setContractDetails] = React.useState({});
  const [changeContractDetails, setChangeContractDetails] = React.useState({});

  function handleGetContract() {
    setExpandContract((prev) => !prev);
    getContract(props.id)
      .then((res) => res.json())
      .then((contract) => {
        setContractDetails(contract.contractDetails);
        setChangeContractDetails(contract.contractDetails);
      });
  }

  function hideContract() {
    setExpandContract(false);
    setExpandEdit(false);
  }

  function editContract() {
    setExpandEdit((prev) => !prev);
  }

  function handleContractChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setChangeContractDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditContractSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    putContract(props.id, changeContractDetails)
      .then((res) => res.json())
      .then((updatedContract) =>
        setContractDetails(updatedContract.contractDetails)
      );
    editContract();
  }

  return (
    <>
      <div className={`contract-container ${expandContract && 'container'}`}>
        {expandContract ? (
          <div>
            <button className='edit-contract-button' onClick={editContract}>
              {expandEdit ? 'cancel edit' : 'edit'}
            </button>
            <button className='hide-contract-button' onClick={hideContract}>
              hide
            </button>
          </div>
        ) : (
          <button
            key={props.id}
            className='contract-button'
            onClick={handleGetContract}
          >
            Contract {props.i}
          </button>
        )}
        <div className='contract-details'>
          {expandContract && (
            <>
              <h3 className='underline-contract-num'>
                <u>Contract {props.i}</u>
              </h3>
              {Object.entries(contractDetails).map(([k, v], i) => {
                return (
                  <>
                    <div className='contract-detail' key={i}>
                      {`${k}: ${v}`}
                    </div>
                  </>
                );
              })}
            </>
          )}
          {expandEdit && (
            <form onSubmit={handleEditContractSubmit}>
              {Object.entries(changeContractDetails).map(([k, v], i) => {
                return (
                  <>
                    <input
                      className='update-contract-input'
                      type='text'
                      name={k}
                      value={v as string}
                      placeholder={k}
                      onChange={handleContractChange}
                    />
                  </>
                );
              })}
              <div>
                {expandEdit && (
                  <button className='update-contract-button'>update</button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ContractComponent;

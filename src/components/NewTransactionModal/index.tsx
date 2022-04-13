import Modal from "react-modal"; 
import closeImg from "../../assets/close.svg"
import {Container, TransactionTypeContainer, RadioBox} from "./styles";
import incomeImg from "../../assets/income.svg"; 
import outcomeImg from "../../assets/outcome.svg"; 
import { FormEvent, useState} from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps{ 
  isOpen: boolean; 
  onRequestClose: () => void; 
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){ 

  const {createTransaction} = useTransactions();  

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0); 
  const [category, setCategory] = useState(''); 
  const [type, setType] = useState('deposit');  

  async function handleCreateNewTransaction(event: FormEvent){ 
    event.preventDefault(); 
    await createTransaction({
      title,
      amount, 
      category, 
      type
    })
    setTitle(''); 
    setAmount(0); 
    setCategory(''); 
    setType('');
    onRequestClose(); 
  }

  return (
    <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
      <button type="button" 
      onClick={onRequestClose} 
      className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
      <h2>Register transaction</h2>
      <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Title" />
      <input value={amount} onChange={event => setAmount(Number(event.target.value))} type="number" placeholder="Value" />
      <TransactionTypeContainer>
        <RadioBox
          type="button"
          onClick={()=> {setType('deposit')}}
          isActive={type === 'deposit'}
          activeColor="green"
        > 
          <img src={incomeImg} alt="Input" />
          <span>Input</span>
        </RadioBox>
        <RadioBox
          type="button"
          onClick={()=> {setType('withdraw')}}
          isActive={type === 'withdraw'}
          activeColor="red"
        > 
          <img src={outcomeImg} alt="Output" />
          <span>Output</span>
        </RadioBox>
      </TransactionTypeContainer>
      <input value={category} onChange={event => setCategory(event.target.value)} placeholder="Category"/>
      <button type="submit">
        Cadastar
      </button>
      </Container>
    </Modal>
  ); 
}
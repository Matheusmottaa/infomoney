import {createContext, useEffect, useState, ReactNode, Children, useContext} from "react";
import { api } from "../services/api";

interface Transaction{ 
  id: number;
  title: string;
  amount: number; 
  type: string; 
  category: string; 
  createdAt: Date; 
}

interface TransactionProviderProps{ 
  children: ReactNode; 
}

interface TransactionsContextData{ 
  transactions: Transaction[]; 
 createTransaction: (trascation: TransactionInput) => Promise<void>;  
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData 
  );

export function TransactionsProvider({children}: TransactionProviderProps){ 
  const [transactions, setTransacitons] = useState<Transaction[]>([]); 
  useEffect(()=>{
    api.get('transactions')
    .then(response => setTransacitons(response.data.transactions)); 
  },[]); 

  async function createTransaction(transactionInput: TransactionInput){ 
   const response = await api.post('/transactions', { 
     ...transactionInput, 
     createdAt: new Date(), 
   }); 
   const {transaction} = response.data; 
   setTransacitons([...transactions, transaction]); 
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){ 
  const context = useContext(TransactionsContext); 
  return context; 
}
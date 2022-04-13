import React from 'react';
import {render} from 'react-dom';
import {createServer, Model} from "miragejs";
import {App} from './App';

createServer({ 

  models:{ 
    transaction: Model, 
  },

  seeds(server){ 
    server.db.loadData({
    })
  },

  routes(){ 
    this.namespace = 'api'; 

    this.get('/transactions', ()=>{ 
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody); 
      return schema.create('transaction', data); 
    }); 
  }
})

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


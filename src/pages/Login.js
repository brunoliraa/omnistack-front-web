import React, {useState} from 'react';
import './Login.css'
import api from '../services/api';

import logo from '../assets/pizza.jpg';

//Criar componentes sempre com letra maiscula inicial
export default function Login( {history} ){
  const [username, setUserName]= useState('');
  async function handleSubmit(e){
    e.preventDefault();
    const response = await api.post('/devs', {
      username:username,
    });
    const {_id} = response.data;
    /*precisa passar o id pra pagina Main, pq é ela que vai fazer a requisição pra api
    para trazer os dados dos outros devs */
    
    console.log(response);
    history.push(`/dev/${_id}`);
    
    // console.log(username)
  }
  
  return (
        <div className="login-container">

          
          <form onSubmit={handleSubmit}>
            <img src={logo} alt="tindev"></img> 
              <input 
              placeholder="digite seu usuario no github"
              value={username}
              onChange={evento => setUserName(evento.target.value)}
              ></input>
              <button type="submit">Enviar</button>
          </form>
        </div>
    )
}
//o useState retorna dois valores, tipo "get e set"
//evento.target.value pra pegar o valor digitado pelo usuario
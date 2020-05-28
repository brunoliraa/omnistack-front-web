import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api'

import logo from '../assets/pizza.jpg';

//o match contém todos os parametros passados na url
export default function Main( {match} ){
    //iniciar a variavel com um array vazio, pq a variavel user terá varios usuarios
    const [users, setUsers]= useState([]);

    //recebe dois parametros, a função a ser executada e quando executar a funcao
    //toda vez que o id que ta na url for alterado a função sera chamada novamente
    useEffect(()=>{
        async function loadUsers(){
            const response = await api.get('/devs',{
                headers:{
                    user:match.params.id,
                }
            })
            //o id do user é enviado pelo header pra exibir a lista de devs
            setUsers(response.data);
            // console.log(response.data);
        }
        loadUsers();
    }, [match.params.id])

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`,null,{
            headers:{user:match.params.id},
        })
        setUsers(users.filter(user=>user._id != id));

        // console.log('like',id)
    }
    async function handleDisike(id){
        await api.post(`/devs/${id}/dislikes`,null,{
            headers:{user:match.params.id},
        })
        setUsers(users.filter(user=>user._id != id));

        /*tbm precisa enviar no header o Id do usuario que ta dando dislike,
        porem com post, o 2 parametro da requisicao é o corpo e o terceiro ep o header
        */
        // console.log('Dislike',id)
    }

return(
    <div className="main-container">
        <Link to="/">
        <img src="" alt="tindev"></img>
        </Link>
    
        {users.length > 0 ?(
            <ul>
                {users.map(user=>(
            <li key={user._id}>
            <img src={user.avatar} alt={user.name}></img>
            <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
            </footer>
            <div className="buttons">
                <button type="button" onClick={()=> handleLike(user._id)}>like</button>
                <button type="button" onClick={()=> handleDisike(user._id)}>dislike</button>
            
            </div>
            </li>
            ))}
            </ul>
         ) : (
             <div className="empty">
                Acabou :(
             </div>
         )}
         
        
    </div>
)
}
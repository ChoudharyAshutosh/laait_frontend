import React, { useEffect } from 'react';
import './Login.css';

export default function Login({ setLoggedUser, validateEmail, connectToChat }){
  useEffect(()=>{
    document.querySelector('#user_login').focus();
  },[]);

  const login=(event)=>{
    if(event.charCode && event.charCode!==13)
      return;
    var id=document.querySelector('#user_login').value;
    if(validateEmail(id)){
      document.querySelector('#open_chat_button');
      setLoggedUser(id);
      connectToChat(id);
    }
    else {
      document.querySelector('#user_login').value='';
      document.querySelector('#login_error').innerHTML='Please enter valid email.';
      document.querySelector('#user_login').focus();
    }
  }

  return(
    <div className={'login_container'}>
      <div className={'login_box'}>
        <input type="email" className={'login_input'} id="user_login" onKeyPress={login.bind(this)}/>
        <div className={'login_error'} id={'login_error'}></div>
        <button className={'login_button'} onClick={login}>LOGIN</button>
      </div>
    </div>
  );
}

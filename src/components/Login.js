import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleLogo from '../assests/google-icon.png'
import './Login.css';

export default function Login({ setLoggedUser, validateEmail, connectToChat }){
  /*useEffect(()=>{
    document.querySelector('#user_login').focus();
  },[]);*/

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
  const responseSuccessGoogle = (response) => {
  console.log(response.profileObj.email);
  setLoggedUser(response.profileObj.email);
  connectToChat(response.profileObj.email);
  }
  const responseFailureGoogle = (response) => {
  console.log(response);
  }
  return(
    <div className={'login_container'}>
      <div className={'login_box'}>
      <GoogleLogin
        render={renderProps => (
          <div className={'google-login'} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img className={'google-icon'} src={GoogleLogo} />
            <div className={'login-text'}>Login with Google</div>
          </div>
        )}
        clientId="763812005023-ivcng78nucojoifa5eesc22hp98aib4n.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
        {/*<input type="email" className={'login_input'} id="user_login" onKeyPress={login.bind(this)}/>
        <div className={'login_error'} id={'login_error'}></div>
        <button className={'login_button'} onClick={login}>LOGIN</button>*/}
      </div>
    </div>
  );
}

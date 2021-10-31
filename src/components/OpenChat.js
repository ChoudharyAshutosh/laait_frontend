import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './OpenChat.css';
export default function OpenChat(){
  const showChat=()=>{
    document.querySelector('#chat_area').classList.toggle('hide');
  }
  return(
    <div id="open_chat_button" onClick={showChat}>
      <FontAwesomeIcon icon={faComments} color={'white'} size={'3x'}/>
    </div>
  )
}

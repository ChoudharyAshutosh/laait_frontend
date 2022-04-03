import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
//import mqtt from 'mqtt';
import './OpenChat.css';
export default function OpenChat({ setChatViewStatus }){
  const showChat=()=>{
    setChatViewStatus(true);
  }
  return(
    <div id="open_chat_button" onClick={showChat}>
      <FontAwesomeIcon icon={faComments} color={'white'} size={'3x'}/>
    </div>
  )
}

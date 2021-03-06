import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatArea.css';
export default function ChatArea({ loggedUser, subscribe, validateEmail, chat, updateChat, setChatViewStatus, messagesEndRef, chatClient, publish }){
  const closeChat=()=>{
    setChatViewStatus(false);
    //document.querySelector('#chat_area').classList.toggle('hide');
    //document.querySelector('#open_chat_button').classList.toggle('hide');
    //document.querySelector('#close_chat_button').classList.toggle('hide');
  }
  const displayChat=()=>{
    if(chat){
      return chat.map((msg,index)=>{
        if(msg.sender==='self'){
          return(
            <div className="outgoing_message" key={'msg_'+index}>
              <div>{msg.message}</div>
              <div className="outgoing_time">{(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
            </div>
          )
        }
        else{
          return(
            <div className="incoming_message_container" key={'msg_'+index}>
              <div className="incoming_message">
                <div>{msg.message}</div>
                <div className="incoming_time">{msg.sender} {(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
              </div>
            </div>
          )
        }
      })
    }
  }
  const sendMessage=(action)=>{
    var message=document.querySelector('#message_to_send').value;
    document.querySelector('#message_to_send').value='';
    if(!message) return;
    if(action==='send'){
      updateChat([...chat,{sender:'self',message:message}]);
      publish('laait_forum',JSON.stringify({sender:loggedUser,message:message}),0);
      console.log(action);
    }
    else if(action==='invite'){
      if(validateEmail(message)){
        publish(message+':request',JSON.stringify({sender:loggedUser,message:'Invitation for joining chat'}),0);
        //subscribe(message+':response', 0);
        document.querySelector('#invitation_error').innerHTML="";
      }
      else{
        document.querySelector('#invitation_error').innerHTML="Please enter valid email";
      }
      console.log(action);
    }
  }
  const triggerMessage=(event)=>{
    console.log(event.keyCode)
    if(event.keyCode===13)
      sendMessage('send');
  }
  return(
    <div id={'chat_area'}>
      <div className="chat_section">
        <div id="close_chat_button" onClick={closeChat}>
          <FontAwesomeIcon icon={faWindowClose} color={'red'} size={'1x'}/>
        </div>
        <div className="chat">
          <div className="chat_messages" id="chat_messages">
            {displayChat()}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className={'invitation_error'} id={"invitation_error"}></div>
        <div className="message_typing_section">
          <input type="text" className="message_input" id="message_to_send" onKeyDown={triggerMessage}/>
          <button className="invite" onClick={sendMessage.bind(this,'invite')}>
            <FontAwesomeIcon icon={faUserPlus} color={'red'}/>
          </button>
          <button className="message_send" onClick={sendMessage.bind(this,'send')}>
            <FontAwesomeIcon icon={faPaperPlane} color={'blue'}/>
          </button>
        </div>
      </div>
    </div>
  )
}

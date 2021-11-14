import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import mqtt from 'mqtt';
import './OpenChat.css';
export default function OpenChat({ setChatViewStatus, chatClient, setChatClient, setNewMsgReceived }){
  const showChat=()=>{
    if(!chatClient){
    const url = `ws://broker.emqx.io:8083/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    };
    var chatClient=mqtt.connect(url, options)
    if (chatClient) {
      chatClient.on('connect', () => {
        console.log('Connected');
      });
      chatClient.on('error', (err) => {
        console.error('Connection error: ', err);
        chatClient.end();
      });
      chatClient.on('reconnect', () => {
        console.log('Reconnecting');
      });
      chatClient.subscribe('test', 0, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return;
        }
      })
      chatClient.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setNewMsgReceived(payload);
      });
    }
    setChatClient(chatClient)
    }
    setChatViewStatus(true);
    //document.querySelector('#chat_area').classList.toggle('hide');
    //document.querySelector('#open_chat_button').classList.toggle('hide');
    //document.querySelector('#close_chat_button').classList.toggle('hide');
  }
  const update=(payload)=>{

  }
  return(
    <div id="open_chat_button" onClick={showChat}>
      <FontAwesomeIcon icon={faComments} color={'white'} size={'3x'}/>
    </div>
  )
}

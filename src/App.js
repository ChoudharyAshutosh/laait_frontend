import React,{ useState, useEffect, useRef, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsPDF } from "jspdf";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import mqtt from 'mqtt';
import Menu from './components/Menu';
import Login from './components/Login.js'
import CodeArea from './CodeArea';
import ChatArea from './ChatArea';
import OpenChat from './components/OpenChat';
import RequestResponseModal from './components/RequestResponseModal';
import './App.css';

function App() {
  const [currentId,setCurrentId]=useState(1);
  const [loggedUser,setLoggedUser]=useState(null);
  const [lastId, setLastId]=useState(1);
  const [codeArea, setCodeArea]=useState(['']);
  const [chat, updateChat]=useState([]);
  const [chatViewStatus,setChatViewStatus]=useState(false);
  const [chatClient, setChatClient]=useState(null);
  const [newMsgReceived, setNewMsgReceived]=useState(null);
  const messagesEndRef = useRef(null);
  const [requestPayload, setRequestPayload] = useState(null);
  useEffect(()=>{
    if(messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  useEffect(()=>{
    if(newMsgReceived){
      if(JSON.parse(newMsgReceived).sender!==loggedUser){
        let chatHistory =chat;
       updateChat([...chatHistory,JSON.parse(newMsgReceived)]);
     }
    }
  },[newMsgReceived/*, chat, loggedUser*/]);

  useEffect(()=>{
    setCodeArea([(
      <div className="code-line" id={1} key={1}>
        <div className="code-input">
            <div className="play-icon"><FontAwesomeIcon icon={faPlay} color={'#FE9B00'} onClick={compileCode.bind(this, 1)}/></div>
            <div className="code-line-container">
                <textarea id={'input_1'} onKeyDown={updateRowNo} onFocus={async()=>{await setCurrentId(1);/*console.log(1);*/}} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
            </div>
        </div>
        <div id={'output_'+1} className="code-output"></div>
      </div>
    )])
  },[]);

  const validateEmail=(email)=>{
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(email);
 }

  const publish=(topic,message,qos)=>{
    console.log(topic,message)
    if(chatClient){
      chatClient.publish(topic, message, 0, error => {
        if (error) {
          console.log('Publish error: ', error);
        }
      });
    }
  }
  const subscribe=(topic,qos)=>{
    if(chatClient){
      chatClient.subscribe(topic, qos, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return;
        }
      });
    }
  }
  const updateRowNo=(event)=>{
    //   console.log(event.target.value.charCodeAt(event.target.value.length-1))
    //   console.log(event.key,event.charCode,event.keyCode)
       if((event.charCode===8 || event.keyCode===8) && event.target.value.charCodeAt(event.target.value.length-1)===10)
           event.target.rows=event.target.rows-1;
       else if(event.charCode===13 || event.keyCode===13)
           event.target.rows=event.target.rows+1;
   }
   const newElement=(id,code="")=>{
     return(
      <div className="code-line" id={id} key={id}>
        <div className="code-input">
            <div className="play-icon"><FontAwesomeIcon icon={faPlay} color={'#FE9B00'} onClick={compileCode.bind(this, id)} /></div>
            <div className="code-line-container">
                <textarea id={"input_"+id} defaultValue={code} onKeyDown={updateRowNo} onFocus={async()=>{await setCurrentId(id);/*console.log(id);*/}} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
            </div>
        </div>
        <div id={'output_'+id} className="code-output"></div>
      </div>
     )
   }

   const compileCode=(id)=>{
     let code = document.getElementById('input_'+id).value;
     document.getElementById('output_'+id).style.padding = '1%';
     document.getElementById('output_'+id).style.borderRadius = '5px';
     document.getElementById('output_'+id).innerHTML = code;
   }

   const createPDF=()=>{
     const doc = new jsPDF();
     let name = document.getElementById('project-name').innerHTML;
     let codeData = document.getElementById('code_area').childNodes;
     let text='';
     codeData.forEach((codeBox, i) => {
        text+='  Code : \n\n';
        text+=document.getElementById('input_'+codeBox.id).value+' \n\n\n';
        text+='  Output : \n\n';
        text+=document.getElementById('output_'+codeBox.id).innerHTML+' \n\n';
        text+='\n\n';
     });
     doc.text(text, 10, 10);
     doc.save(name+".pdf");
   }

   const compileAllCode=()=>{
     let codeData = document.getElementById('code_area').childNodes;
     codeData.forEach(async(codeBox, i) => {
        await compileCode(codeBox.id);
    });
   }

   const performAction=(topic,message,id)=>{
     if(topic.split(':').length===1){
       if(JSON.parse(message).sender!==id)
        setNewMsgReceived(message);
     }
     else {
       const payload = { topic, message: JSON.parse(message) };
       setRequestPayload(payload);
     }
  }

   const connectToChat=(id)=>{
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
     var chattingClient=mqtt.connect(url, options)
     if (chattingClient) {
       chattingClient.on('connect', () => {
         console.log('Connected');
       });
       chattingClient.on('error', (err) => {
         console.error('Connection error: ', err);
         chattingClient.end();
       });
       chattingClient.on('reconnect', () => {
         console.log('Reconnecting');
       });
       chattingClient.subscribe('laait_forum', 0, (error) => {
         if (error) {
           console.log('Subscribe to topics error', error)
           return;
         }
       });
       if(id){
         console.log(id)
         chattingClient.subscribe(id+':request', 0, (error) => {
           console.log(id+':request');
           if (error) {
             console.log('Subscribe to topics error', error)
             return;
           }
         });
         chattingClient.subscribe(id+':response', 0, (error) => {
           if (error) {
             console.log('Subscribe to topics error', error)
             return;
           }
         });
      }
       chattingClient.on('message', (topic, message) => {
         performAction(topic, message, id);
         //setNewMsgReceived(payload.message);
       });
     }
     setChatClient(chattingClient)
     }
   }
  return (
    <div className="App">
      {
        !loggedUser && (
          <Login setLoggedUser={setLoggedUser} validateEmail={validateEmail} connectToChat={connectToChat.bind(this)}/>
        )
      }

      {
        loggedUser && (
          <Fragment>
            <Menu updateChat={updateChat} setLoggedUser={setLoggedUser} chatClient={chatClient} setCurrentId={setCurrentId} currentId={currentId} setLastId={setLastId} lastId={lastId} newElement={newElement} setCodeArea={setCodeArea} codeArea={codeArea} createPDF={createPDF} compileAllCode={compileAllCode}/>
            <div className={"page_container"}>
              <CodeArea setCurrentId={setCurrentId} currentId={currentId} setLastId={setLastId} lastId={lastId} updateRowNo={updateRowNo} codeArea={codeArea}/>
              {
                chatViewStatus && (
                  <ChatArea loggedUser={loggedUser} subscribe={subscribe} validateEmail={validateEmail} chat={chat} updateChat={updateChat} setChatViewStatus={setChatViewStatus} messagesEndRef={messagesEndRef} chatClient={chatClient} publish={publish}/>
                )
              }
              {
                !chatViewStatus && loggedUser && (
                  <OpenChat setChatViewStatus={setChatViewStatus} chatClient={chatClient} setChatClient={setChatClient} setNewMsgReceived={setNewMsgReceived}/>
                )
              }
            </div>
            {
              requestPayload && (
                <RequestResponseModal loggedUser={loggedUser} requestPayload={requestPayload} setRequestPayload={setRequestPayload} publish={publish} setChatViewStatus={setChatViewStatus}/>
              )
            }
          </Fragment>
          )
        }
    </div>
  );
}

export default App;

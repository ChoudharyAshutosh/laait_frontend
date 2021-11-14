import React,{ useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu';
import CodeArea from './CodeArea';
import ChatArea from './ChatArea';
import OpenChat from './components/OpenChat';
import './App.css';

function App() {
  const [currentId,setCurrentId]=useState(1);
  const [lastId, setLastId]=useState(1);
  const [codeArea, setCodeArea]=useState(['']);
  const [chat, updateChat]=useState([]);
  const [chatViewStatus,setChatViewStatus]=useState(false);
  const [chatClient, setChatClient]=useState(null);
  const [newMsgReceived, setNewMsgReceived]=useState(null);
  const messagesEndRef = useRef(null);
  useEffect(()=>{
    if(messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  useEffect(()=>{
    if(newMsgReceived){
      updateChat([...chat,{sender:newMsgReceived.topic,message:newMsgReceived.message}]);
    }
  },[newMsgReceived])
  useEffect(()=>{
    setCodeArea([(
      <div className="code-line" id={1} key={1}>
        <div className="code-input">
            <div className="play-icon"><FontAwesomeIcon icon={faPlay} color={'#FE9B00'}/></div>
            <div className="code-line-container">
                <textarea id={'input_1'} onKeyDown={updateRowNo} onFocus={async()=>{await setCurrentId(1);/*console.log(1);*/}} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
            </div>
        </div>
        <div className="code-output"></div>
      </div>
    )])
  },[])
  const publish=(topic,message,qos)=>{
    if(chatClient){
      chatClient.publish('test', message, 0, error => {
        if (error) {
          console.log('Publish error: ', error);
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
            <div className="play-icon"><FontAwesomeIcon icon={faPlay} color={'#FE9B00'}  /></div>
            <div className="code-line-container">
                <textarea id={"input_"+id} defaultValue={code} onKeyDown={updateRowNo} onFocus={async()=>{await setCurrentId(id);/*console.log(id);*/}} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
            </div>
        </div>
        <div className="code-output"></div>
      </div>
     )
   }
  return (
    <div className="App">
      {/*<Connect/>*/}
      <Menu setCurrentId={setCurrentId} currentId={currentId} setLastId={setLastId} lastId={lastId} newElement={newElement} setCodeArea={setCodeArea} codeArea={codeArea}/>
      <div className={"page_container"}>
        <CodeArea setCurrentId={setCurrentId} currentId={currentId} setLastId={setLastId} lastId={lastId} updateRowNo={updateRowNo} codeArea={codeArea}/>
        {
          chatViewStatus && (
            <ChatArea chat={chat} updateChat={updateChat} setChatViewStatus={setChatViewStatus} messagesEndRef={messagesEndRef} chatClient={chatClient} publish={publish}/>
          )
        }
        {
          !chatViewStatus && (
            <OpenChat setChatViewStatus={setChatViewStatus} chatClient={chatClient} setChatClient={setChatClient} setNewMsgReceived={setNewMsgReceived}/>
          )
        }

      </div>
    </div>
  );
}

export default App;

import React,{ useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
//import { Connector, useMqttState } from 'mqtt-react-hooks';
import Menu from './components/Menu';
import CodeArea from './CodeArea';
import ChatArea from './ChatArea';
import OpenChat from './components/OpenChat';
//import Connect from './components/Connection'
import mqtt from 'mqtt'
import './App.css';

function App() {
  const [currentId,setCurrentId]=useState(1);
  const [lastId, setLastId]=useState(1);
  const [codeArea, setCodeArea]=useState(['']);
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
        <ChatArea />
        <OpenChat/>
      </div>
    </div>
  );
}

export default App;

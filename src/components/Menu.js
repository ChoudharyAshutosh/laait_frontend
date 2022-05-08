import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogout } from 'react-google-login';
import { faSave, faPlus, faCut, faCopy, faArrowUp, faArrowDown, faPlay, faStop, faRedoAlt, faForward, faBook } from '@fortawesome/free-solid-svg-icons'
import RenameModal from './RenameModal'
import './Menu.css'
export default function Menu({ updateChat, setLoggedUser, chatClient, setCurrentId, currentId, setLastId, lastId, newElement, codeArea, setCodeArea, createTxt, openDocumentation }){
    const logoutSuccessResponse=(response)=>{
      console.log(response);
      chatClient.end();
      setLoggedUser(null);
      updateChat([]);
    }
    const logoutFailureResponse=(response)=>{
      console.log(response);
    }
    const addNewCodeInputLine=async(operation)=>{
        var data=codeArea;
        var index=-1;
        data.forEach((array_element,i) => {
            if(parseInt(array_element.key)===currentId){
                index=i;
            }
        });
    
        if(operation==='cut' && data.length>1 && index>-1){
            document.getElementById(currentId).style.display='none';
            data.splice(index,1);
            setCurrentId(-1);
            setCodeArea(data);
        }
        else if(operation==='add'){
            if(index===-1)
                data=[...data,newElement(lastId+1)]
            else
                data.splice(index+1,0,newElement(lastId+1));
            await setLastId(lastId+1);
            setCurrentId(-1);
            setCodeArea(data);
        }
        else if(operation==='move_up' && data.length>0){
            let elementToFocus=null;
            if(index>0)
                elementToFocus=data[index-1];
            else
                elementToFocus=data[index];
            document.getElementById('input_'+elementToFocus.props.id).focus();
            setCurrentId(elementToFocus.props.id);
        }
        else if(operation==='move_down' && data.length>0 && index>-1){
            let elementToFocus=null;
            if(index<data.length-1)
                elementToFocus=data[index+1];
            else
                elementToFocus=data[index];
            document.getElementById('input_'+elementToFocus.props.id).focus();
            setCurrentId(elementToFocus.props.id);
        }
        else if(operation==='copy' && index>-1){
            var code=document.getElementById('input_'+currentId).value;
            data.splice(index+1,0,newElement(lastId+1,code));
            await setLastId(lastId+1);
            setCurrentId(-1);
            setCodeArea(data);
        }
    }
    const openRenameModal=()=>{
        var projectName=document.getElementById('project-name').innerHTML;
        document.getElementById('rename').value=projectName;
        document.getElementById('rename_error_message').innerHTML='';
        document.getElementById('modal').style.display='flex';
        document.getElementById('rename').focus();
    }
    return (
        <div className="menu-container">
            <div className="menus">
                <div className="menu-bar-icons" onClick={createTxt}><FontAwesomeIcon icon={faSave} color={'blue'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'add')}><FontAwesomeIcon icon={faPlus} color={'#996600'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'cut')}><FontAwesomeIcon icon={faCut} color={'red'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'copy')}><FontAwesomeIcon icon={faCopy} color={'purple'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_up')}><FontAwesomeIcon icon={faArrowUp}  color={'#666699'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_down')}><FontAwesomeIcon icon={faArrowDown}  color={'#666699'}/></div>
                <div id="documentation" className="menu-bar-icons" onClick={openDocumentation}><FontAwesomeIcon icon={faBook} color={'green'}/></div>
                <div className="menu-name">
                    <div className="project-name" id="project-name" onClick={openRenameModal}>Enter name</div>
                    <GoogleLogout
                      render={renderProps => (
                        <div className={'google-logout'} onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</div>
                      )}
                      clientId="763812005023-ivcng78nucojoifa5eesc22hp98aib4n.apps.googleusercontent.com"
                      buttonText="Logout"
                      onLogoutSuccess={logoutSuccessResponse}
                      onLogoutFailure={logoutFailureResponse}/>

                </div>
            </div>
            <RenameModal/>
        </div>
    )
}

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus, faCut, faCopy, faArrowUp, faArrowDown, faPlay, faStop, faRedoAlt, faForward } from '@fortawesome/free-solid-svg-icons'
import RenameModal from './RenameModal'
import './Menu.css'
export default function Menu({ setCurrentId, currentId, setLastId, lastId, newElement, codeArea, setCodeArea }){
    const addNewCodeInputLine=async(operation)=>{
        //alert(currentId)
        var data=codeArea;
         // var data=Object.values(document.getElementsByClassName('code-container')[0].children);
        //data.splice(0,1);
        //  console.log(data)
        /*var element=document.getElementById(currentId);
        console.log(element)
        console.log(element.key);*/
        //console.log(currentId)
        var index=-1;
        data.forEach((array_element,i) => {
            //console.log(array_element)
            if(parseInt(array_element.key)===currentId){
                index=i;
            }
        });
      //  alert(index+', '+lastId)
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

        //console.log(data)


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
                {/*<div className="menu-name">File</div>
                <div className="menu-name">Edit</div>
                <div className="menu-name">View</div>
                <div className="menu-name">Insert</div>
                <div className="menu-name">Cell</div>
                <div className="menu-name">Kernel</div>
                <div className="menu-name">Help</div>*/}
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faSave} color={'blue'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'add')}><FontAwesomeIcon icon={faPlus} color={'#996600'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'cut')}><FontAwesomeIcon icon={faCut} color={'red'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'copy')}><FontAwesomeIcon icon={faCopy} color={'purple'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_up')}><FontAwesomeIcon icon={faArrowUp}  color={'#666699'}/></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_down')}><FontAwesomeIcon icon={faArrowDown}  color={'#666699'}/></div>
                <div id="run_all" className="menu-bar-icons"><FontAwesomeIcon icon={faPlay} color={'green'}/> &nbsp;Run</div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faStop}  color={'#494950'}/></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faRedoAlt}  color={'#6060eb'}/></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faForward}  color={'#00ff80'}/></div>
                <div className="menu-name">
                    <div className="project-name" id="project-name" onClick={openRenameModal}>Ashutosh Choudhary</div>
                </div>
            </div>
            {/*<div className="tool-bar">
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faSave} /></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'add')}><FontAwesomeIcon icon={faPlus} /></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'cut')}><FontAwesomeIcon icon={faCut} /></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'copy')}><FontAwesomeIcon icon={faCopy} /></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_up')}><FontAwesomeIcon icon={faArrowUp} /></div>
                <div className="menu-bar-icons" onClick={addNewCodeInputLine.bind(this,'move_down')}><FontAwesomeIcon icon={faArrowDown} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faPlay} /> &nbsp;Run</div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faStop} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faRedoAlt} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faForward} /></div>
                <div className="menu-bar-icons">
                    <select className="selection-list">
                        <option>Code</option>
                        <option>Markdown</option>
                        <option>Raw NBConvert</option>
                        <option>Heading</option>
                    </select>
                </div>
            </div>*/}
            <RenameModal/>
        </div>
    )
}

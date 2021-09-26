import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus, faCut, faCopy, faArrowUp, faArrowDown, faPlay, faStop, faRedoAlt, faForward } from '@fortawesome/free-solid-svg-icons'
import RenameModal from './RenameModal'
import './Menu.css'
export default function Menu(){
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
                <div className="menu-name">File</div>
                <div className="menu-name">Edit</div>
                <div className="menu-name">View</div>
                <div className="menu-name">Insert</div>
                <div className="menu-name">Cell</div>
                <div className="menu-name">Kernel</div>
                <div className="menu-name">Help</div>
                <div className="menu-name">
                    <div className="project-name" id="project-name" onClick={openRenameModal}>Ashutosh Choudhary</div>
                </div>
            </div>
            <div className="tool-bar">
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faSave} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faPlus} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faCut} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faCopy} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faArrowUp} /></div>
                <div className="menu-bar-icons"><FontAwesomeIcon icon={faArrowDown} /></div>
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
            </div>
            <RenameModal/>
        </div>
    )
}
import React from 'react';
import './RenameModal.css';
export default function RenameModal(){
    const closeRenameModal=(task)=>{
        if(task==='cancel')
            document.getElementById('modal').style.display='none';
        else if(task==='rename'){
            var projectName=document.getElementById('rename').value;
            if(projectName===''){
                document.getElementById('rename_error_message').innerHTML="Project name can not be empty."
                return;
            }
            document.getElementById('project-name').innerHTML=projectName;
            document.getElementById('modal').style.display='none';
        }
    }
    const hideRenameErrorMessage=()=>{
        document.getElementById('rename_error_message').innerHTML='';
    }
    return(
        <div className="modal" id="modal">
            <div className="modal-content">
                <div className="modal-body">
                    <input type="text" id="rename" onFocus={hideRenameErrorMessage}/>
                    <div id="rename_error_message"></div>
                </div>
                <div className="modal-header">
                    <button className="close" onClick={closeRenameModal.bind(this,'cancel')}>Cancel</button>
                    <button className="close" onClick={closeRenameModal.bind(this,'rename')}>Rename</button>
                </div>
            </div>
        </div>
    )
}
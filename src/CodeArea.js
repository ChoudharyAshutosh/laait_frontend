import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import './CodeArea.css';
export default function CodeArea(){
    const updateRowNo=(event)=>{
     //   console.log(event.target.value.charCodeAt(event.target.value.length-1))
     //   console.log(event.key,event.charCode,event.keyCode)
        if((event.charCode===8 || event.keyCode===8) && event.target.value.charCodeAt(event.target.value.length-1)===10)
            event.target.rows=event.target.rows-1;
        else if(event.charCode===13 || event.keyCode===13)
            event.target.rows=event.target.rows+1;
    }
    return(
        <div className="codearea">
            <div className="code-container">
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={1} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
                <div className="code-line">
                    <div className="code-input">
                        <div className="play-icon"><FontAwesomeIcon icon={faPlay} /></div>
                        <div className="code-line-container">
                            <textarea onKeyDown={updateRowNo} className="code" rows={2} autoCorrect="off" autoCapitalize="none" spellCheck="false" tabIndex="0" wrap="off"></textarea>
                        </div>
                    </div>
                    <div className="code-output"></div>
                </div>
            </div>
        </div>
    )
}
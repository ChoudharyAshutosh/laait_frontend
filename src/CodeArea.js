import React from "react";
import './CodeArea.css';
export default function CodeArea({ codeArea }){
    return(
        <div className="codearea">
            <div className="code-container" id={"code_area"}>
                {codeArea.map(code=>(code))}
            </div>
        </div>
    )
}

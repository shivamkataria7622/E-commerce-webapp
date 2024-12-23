import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import "./Error.css";
function Error(props){
    return(
        <div className="Error1">
            <h1>{props.message}</h1>

        </div>
    );
}
export default Error;
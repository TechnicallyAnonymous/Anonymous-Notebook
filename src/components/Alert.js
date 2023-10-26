// rafce --> react arrow function component export
import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";


const Alert = () => {

    const context = useContext(noteContext);
    const {alert} = context;  

    function capitalizeFirstLetter(str) {
        if(str==="danger"){
            return "Error"
        }
            return str.charAt(0).toUpperCase() + str.substring(1);
    }

    return (
        <div style={{height:"60px"}}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalizeFirstLetter(alert.type)}</strong>: {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
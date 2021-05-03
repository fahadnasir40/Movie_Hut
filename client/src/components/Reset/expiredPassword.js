import React from "react";
import Header from './../Header/header'
const expirePassword = (props) => {
    function foo (){
        setTimeout(()=>{props.history.push("/")}, 2800)
    }
    return(
        <div>
            <Header />
            <h5 className="m-4">Reset Link has Expired.</h5>
            {foo()}
        </div>
    )
}


export default expirePassword
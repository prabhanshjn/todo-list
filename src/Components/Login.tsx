import React from "react";
import {auth,provider} from "../Config/firebase"
import {signInWithPopup} from "firebase/auth"
import {useHistory} from "react-router-dom"


// @ts-ignore
const Login = ({setIsAuth}) => {

    let navigate = useHistory();

    const signInWithGoogle = () => {
        signInWithPopup(auth,provider).then((result) =>{
            setIsAuth(true)
            navigate.push("/");
        } )

    }

    return(

        <div>
            <h1>Sign In With Google to Continue</h1>
            <button onClick={signInWithGoogle}>Google Sign In</button>
        </div>
        )

}

export default Login
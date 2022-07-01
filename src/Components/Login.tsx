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
            if (auth.currentUser.uid !== null){
                console.log(auth.currentUser.displayName)
                navigate.push("/");

            }
        } )

    }

    return(

        <div className={"w-full p-10"}>
            <div className={"mx-auto w-3/6 text-center"}>
            <h1 className={"subpixel-antialiased text-2xl mb-12"}>Sign In With Google to Continue</h1>
            <button className={"btn uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900"} onClick={signInWithGoogle}>Google Sign In</button>
            </div>
        </div>
        )

}

export default Login
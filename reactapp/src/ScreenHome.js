
import React, {useState, useEffect, useRef} from 'react';
import {gsap} from "gsap";
import './App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

function ScreenHome(props) {
  const [toggle, setToggle] = useState(false)////animation gsap
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  /////////animation gsap
  const changeState = () => {
    setToggle(!toggle)
  };

  const cardRef = useRef(null);
  const cardRefb = useRef(null)
  useEffect(() => {
    gsap.to(cardRef.current, {
      scale: 1.2,
      rotateX: 360,
      duration: 1.2
    }) 
    gsap.to(cardRefb.current, {
      scale: 1.2,
      rotateX: 360,
      duration: 1.2
    })
    console.log(cardRef)
  })
//////////////////////////////////////////////////////sign-up
  var handleSubmitSignup = async () => {
    const signup = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
    })
    const signupj = await signup.json()
    if(signupj.result === true){
      props.rectok(signupj.token);
      setUserExists(true)
    } else {
      setErrorsSignup(signupj.error);
    }
  }
///////////////////////////////////////////////////////////sign-in
  var handleSubmitSignin = async () => {
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })
    const body = await data.json()
    if(body.result === true){
      props.rectok(body.token)
      console.log("RECTOK",body.token)
      setUserExists(true)
    }  else {
      setErrorsSignin(body.error)
    }
  }

  if(userExists){
    return <Redirect to='/screensource' />
  }
  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })
  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign" onClick={changeState}
            ref={cardRef}>
                  
            <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />

            <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />
            
            {tabErrorsSignin}

            <Button onClick={() => handleSubmitSignin()}  style={{width:'80px'}} type="primary">Sign-in</Button>

          </div>

          {/* SIGN-UP */}
          <div className="Sign" onClick={changeState}
            ref={cardRefb}>
                  
            <Input onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="username" />

            <Input onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="email" />

            <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="password" />
      
            {tabErrorsSignup}

            <Button onClick={() => handleSubmitSignup()} style={{width:'80px'}} type="primary">Sign-up</Button>

          </div>

      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    rectok: function (token) {
      dispatch({ type: "tokenok", token: token });
      console.log("TOKEN/////",token);
    },
  };
}
export default connect(null, mapDispatchToProps)(ScreenHome);
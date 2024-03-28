import React, { useState } from 'react';
import CreateUser from './components/createUser'
import LoginUser from './components/loginUser'
import './App.css';

function App() {

  const [showLogin, setLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const loginHandler = () => {
    setLogin(true);
    setShowRegister(false);
  }
  const registerHandler = () => {
    setShowRegister(true);
    setLogin(false); // Close the LoginUser component if it was open
  }

  return (
    <div className="App">
      <div className='functionWrapper'>

        <div className='navBarWrapper'>
          <div className='appName'>
            <p>Welcome to Food Application</p>
          </div>
          <div className='buttonWrapper'>
            <div className='loginButton' onClick={loginHandler}>
              <p> Login </p>
            </div>
            <div className='registerButton' onClick={registerHandler}>
                <p> Register </p>
            </div>
          </div>
        </div>

        <div className='contentWrapper'>
          {showLogin && <LoginUser />}
          {showRegister && <CreateUser />}
        </div>

      </div>
    </div>
  );
}

export default App;

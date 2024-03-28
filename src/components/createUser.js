import './styles/create.css';

import closeFridge from './assets/closeFridge.png';

function CreateUser(){

      return(

        <div className='registerWrapper'>
          
          <div className='fridgeWrapper'>

            <img src={closeFridge} alt='wow'/>
            
          </div>

          <div className='rightSideSection'>

            <div className='formContainers'>

              <span className='formTitles'>
                <p>Welcome!</p>
                <p><strong>Register a new Account</strong></p>
              </span>

              <form className='formWrappers'>

                <div className='inputWrappers'>

                  <input className='familyName' type="text" name="familyName" placeholder="Enter Family Name Here"  required />

                  <br></br>

                  <input className='emailInput' type="text" name="email" placeholder="Enter Email Here" required />

                    <br></br>

                    <input className='passInput' type="password" name="password" placeholder="Enter Password Here" required />

                    <br></br>

                  <input className='passInput' type="password" name="password2" placeholder="Re-Enter Password Here" required />
                
                </div>

                
                <div className='buttonWrappers'>
                  <button>Register</button>
                </div>
          
              </form>
            

            </div>
          </div>
          

          
        </div>
      )
    };
    
    export default CreateUser;
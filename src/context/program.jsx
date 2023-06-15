import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
export const ProgramContext = React.createContext();

function UserProvider({children}){
  const [userProfile, setUserProfile] = useState({});
  const { user, isAuthenticated } = useAuth0();


  const getUserProfile = async () => {
    if(isAuthenticated){
      let email = user.email
      const userinfo = await axios.get(`${process.env.REACT_APP_DATABASE}/user/${email}`, {headers: {"ngrok-skip-browser-warning": "69420"}});
      setUserProfile(userinfo.data)
    }
    else{
      setUserProfile({})
    }
  }
  useEffect(() => {
    getUserProfile();
  }, []);

  let values = {
    userProfile
  }
  return (
    <ProgramContext.Provider value={values}>
      {children}
    </ProgramContext.Provider>
  );
  
}

export default UserProvider;


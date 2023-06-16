import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/Dashboard",
      },
    });
  };

  return (
    <Button className="button__login" onClick={handleLogin} variant="outlined" color="primary">
      Log In
    </Button>
  );
};

export default LoginButton
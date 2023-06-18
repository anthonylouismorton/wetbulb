import './App.css';
import Main from './components/Main'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useAuth0 } from '@auth0/auth0-react';

export default function App() {
  const { user } = useAuth0()
  return (
    <>
      <NavBar/>
      <Main user={user}/>
      {/* <Footer/> */}
    </>
  );
}

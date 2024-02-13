import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Badges from './components/Badges';
import FlightAppCard from './components/Card';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import AboutUsCarousel from './components/Carousel';
import FlightsCards from './components/Destinations';
import SearchAndUpdateUserForm from './components/UpdateUser';
import Destinations from './components/Display';
import FormSwitcher from './components/AdminForms';
import { useEffect, useState } from 'react';
import Authentication from './components/Authentication';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const userFromSessionStorage = sessionStorage.getItem('user');
    if (userFromSessionStorage) {
      const userData = JSON.parse(userFromSessionStorage);
      setUserData(userData);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    
    if (userData) {
      console.log('User session data:', userData);
    }
  }, [userData]);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" 
                  element={  <>
                    <Banner />
                    <Destinations />
                    <Badges />
                    <FlightAppCard />
                     </> } />
          <Route path="/signin" 
                  element={  < Authentication />} />
          <Route path="/aboutus" 
                  element={ <AboutUsCarousel /> }/>
          <Route path="/destinations" 
                  element={ <FlightsCards /> } />
          <Route path="/userdetails"  
                  element={  <SearchAndUpdateUserForm /> } />
          <Route path='/admin' 
                  element={ <FormSwitcher /> } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
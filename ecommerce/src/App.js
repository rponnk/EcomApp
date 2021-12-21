import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    
      <Router>
        <Header />
          <main>
            <Container className="py-3">
              <Route path='/' component={HomeScreen} exact/>
              <Route path='/login' component={LoginScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/product/:pk' component={ProductScreen} />
              <Route path='/cart/:pk?' component={CartScreen} />
            </Container>
            
          </main>
        <Footer />
      </Router>
  );
}

export default App;

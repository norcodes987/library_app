import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavBarAndFooter/Navbar';
import { Footer } from './layouts/NavBarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();
  
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to = '/home' />
          </Route>
          <Route path='/home' exact>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/reviewlist/:bookId'>
            <ReviewListPage/>
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
        </Switch>
        <Route path='/login' render={() => <LoginWidget config={oktaConfig}/>} />
        <Route path='/login/callback' component={LoginCallback} />
        <SecureRoute path='/shelf'><ShelfPage /></SecureRoute>
        </div>
        <Footer />
      </Security>
    </div>

  );
}



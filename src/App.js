import React from 'react';
import './App.css';
import styled from 'styled-components'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat.js';
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { auth } from './firebase.js';
import LogIn from './components/LogIn.js';
import Spinner from 'react-spinkit'

function App() {

  const [user, loading] = useAuthState(auth)

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="slack logo" />

          <Spinner 
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
          />
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {! user ? (
          <LogIn />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
        
      </Router>
    </div>
  );
}

export default App;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
  > .ball-spin-fade-loader {
    left : 95px;
  }
`

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`

const AppBody = styled.div`
  display : flex;
  height : 100vh;
`
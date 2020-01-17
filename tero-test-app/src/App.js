import React from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify, { API } from 'aws-amplify';
import {Auth} from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'; // if you are using Amplify CLI

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:5edb9100-7aab-40cb-aa04-c591c9373df2',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1', 
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_LyfqaLrgk', 
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1qn7a7qjqpn5elc75a0kofahi3',
},
  API: {
      endpoints: [
          {
              name: "PhoneBookAPI",
              // In real life this should point to a URI defined using Route53
              endpoint: "https://jt5jl5oqeg.execute-api.us-east-1.amazonaws.com/dev"
          }
      ]
  }
});

async function callAPI() {
  let items = await API.get('PhoneBookAPI', '/phonebook', {
    'queryStringParameters': {
      'name': 'Tero'
    }
  });
}

function signOut() {
  console.log("Signing out");
  Auth.signOut();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => signOut()}>
          Sign out
        </button>
        <button onClick={() => callAPI()}>
          Call Phonebook API
        </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);

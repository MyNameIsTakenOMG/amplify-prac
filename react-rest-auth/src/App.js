import logo from './logo.svg';
import './App.css';
import { API, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    console.log({ token });
    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };
    const data = await API.get('reactrestauthapi', '/hello', requestInfo);
    console.log({ data });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={callApi}>call api</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);

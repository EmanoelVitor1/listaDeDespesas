import TelaDespesas from './TelaDespesas';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserEndpoint } from './backend';
import { LoginScreen } from './LoginScreen';
import { IUser } from './tipos';
import { Button } from '@material-ui/core';
import { signOutEndpoint } from './backend';

function App() {
  const mesAtual = obtemMesAtual();
  const [user, setUser] = useState<null | IUser>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  if (user) {
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <strong>Olá, Usuario!</strong>
          <span style={{ margin: '4px' }}>
            <Button variant="contained" color="secondary" onClick={logOut}>
              Sair
            </Button>
          </span>
        </div>
        <HashRouter>
          <Switch>
            <Route path="/despesas/:mes">
              <TelaDespesas />
            </Route>
            <Redirect to={{ pathname: '/despesas/' + mesAtual }} />
          </Switch>
        </HashRouter>
      </div>
    );
  } else {
    return <LoginScreen onSignIn={setUser}></LoginScreen>;
  }

  function logOut() {
    signOutEndpoint().then(() => setUser(null));
  }
}

function obtemMesAtual(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
}

export default App;

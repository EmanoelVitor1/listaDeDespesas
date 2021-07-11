import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { signInEndpoint } from './backend';
import { IUser } from './tipos';

const useStyles = makeStyles({
  error: {
    backgroundColor: 'rgb(253,236,234)',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();
  const [email, setEmail] = useState('usuario@email.com');
  const [senha, setSenha] = useState('1234');
  const [error, setError] = useState('');

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, senha).then(props.onSignIn, e => {
      setError('E-mail ou senha incorretos');
    });
  }

  return (
    <Container maxWidth="sm">
      <h1>Login de Acesso</h1>
      <p>
        Digite e-mail e senha para acessar o sistema. O Back End está preparado
        para aceitar o e-mail: <kbd>usuario@email.com</kbd> e senha:
        <kbd> 1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        ></TextField>
        <TextField
          type="password"
          margin="normal"
          label="senha"
          fullWidth
          variant="outlined"
          value={senha}
          onChange={evt => setSenha(evt.target.value)}
        ></TextField>
        {error && <div className={classes.error}>{error}</div>}
        <div>
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </div>
      </form>
    </Container>
  );
}

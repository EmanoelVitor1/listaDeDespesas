import { IDespesa, IUser } from './tipos';

export function buscaDespesas(anoMes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: 'include',
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: 'include',
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}

export function signInEndpoint(email: string, senha: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}

export function signOutEndpoint(): Promise<void> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: 'include',
    method: 'POST',
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}

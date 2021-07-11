import { useEffect, useState } from 'react';
import { buscaDespesas } from './backend';
import { IDespesa } from './tipos';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useParams, useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const meses = [
  { valor: '01', nome: 'Janeiro' },
  { valor: '02', nome: 'Fevereiro' },
  { valor: '03', nome: 'Março' },
  { valor: '04', nome: 'Abril' },
  { valor: '05', nome: 'Maio' },
  { valor: '06', nome: 'Junho' },
  { valor: '07', nome: 'Julho' },
  { valor: '08', nome: 'Agosto' },
  { valor: '09', nome: 'Setembro' },
  { valor: '10', nome: 'Outubro' },
  { valor: '11', nome: 'Novembro' },
  { valor: '12', nome: 'Dezembro' },
];

function TelaDespesas() {
  const params = useParams<{ mes: string }>();
  const history = useHistory();
  const anoMes = params.mes;
  const [ano, mes] = anoMes.split('-');
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    buscaDespesas(anoMes).then(despesas => setDespesas(despesas));
  }, [anoMes]);

  let valorTotal = 0;
  for (const despesa of despesas) {
    valorTotal += despesa.valor;
  }

  function mudaAnoMes(ano: string, mes: string) {
    history.push(`/despesas/${ano}-${mes}`);
  }

  return (
    <div>
      <Select
        value={ano}
        onChange={e => mudaAnoMes(e.target.value as string, mes)}
        variant="outlined"
      >
        <MenuItem value="2020">2020</MenuItem>
        <MenuItem value="2021">2021</MenuItem>
      </Select>

      <Select
        value={mes}
        onChange={e => mudaAnoMes(ano, e.target.value as string)}
        variant="outlined"
      >
        {meses.map(opcaoMes => (
          <MenuItem key={opcaoMes.valor} value={opcaoMes.valor}>
            {opcaoMes.nome}
          </MenuItem>
        ))}
      </Select>

      <span style={{ textAlign: 'right', margin: '4px' }}>
        Valor total: <strong>R$ {valorTotal}</strong>
      </span>

      <TableContainer component="div">
        <Table aria-label="Despesas do mês" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Despesa</strong>
              </TableCell>
              <TableCell>
                <strong>Categoria</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Dia</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Valor</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.map(despesa => (
              <TableRow key={despesa.id}>
                <TableCell>{despesa.descricao}</TableCell>
                <TableCell>{despesa.categoria}</TableCell>
                <TableCell align="right">{despesa.dia}</TableCell>
                <TableCell align="right">{despesa.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TelaDespesas;

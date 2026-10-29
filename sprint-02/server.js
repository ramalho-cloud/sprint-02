import express from 'express';

const app = express();
const PORT = 3000;

function criarMensagem(id, usuario, texto) {
  return {id, usuario: usuario.trim(), texto: texto.trim()};
}

const mensagens = [
  criarMensagem(1, 'Ana', 'Olá, turma!'),
  criarMensagem(2, 'Pedro', 'Servidor funciona TOP!'),
  criarMensagem(3, 'João', 'Vamos conversar com o mensageiro local'),
];

function listaMensagens() {
  return mensagens;
}

function quantidadeMensagens() {
  return mensagens.length;
}

function buscarMensagem(id) {
  return mensagens.find((mensagems) => mensagems.id === id);
}



app.get('/', (req, res) => {
  res.send('Servidor pronto para uso!🚀');
});

app.get('/status', (req, res) => {
  res.json({
    status: 'Servidor rodando',
    sprint:  '02',
    quantidadeMensagens: quantidadeMensagens(),
  });
});

app.get('/sobre', (req, res) => {
  res.json('Meu primeiro servidor Node.js com express e ES Modules');
});

app.get('/mensagens', (req, res) => {res.json(listaMensagens());});

app.get('/total-mensagens', (req, res) => {res.json({ total: quantidadeMensagens() });});

app.get('/mensagens/:id', (req, res) => {
  const mensagem = buscarMensagem(Number(req.params.id));
  if (!mensagem) 
    res.status(404).json({ erro: 'Mensagem não encontrada' });
  res.json(mensagem);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});


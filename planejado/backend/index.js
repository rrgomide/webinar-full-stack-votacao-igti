const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

let state = {
  totalVotes: 0,
  candidates: [],
};

function fillCandidates() {
  state.totalVotes = 0;
  state.candidates = [
    {
      id: 1,
      name: 'Marco Minnemann',
      votes: 0,
      percentage: 0,
    },
    {
      id: 2,
      name: 'Mike Portnoy',
      votes: 0,
      percentage: 0,
    },
    {
      id: 3,
      name: 'Neil Peart',
      votes: 0,
      percentage: 0,
    },
  ];
}

function getRandomNumber(from = 1, to = 10000) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

function simulate() {
  setInterval(() => {
    state.candidates.forEach((candidate) => {
      const votes = getRandomNumber();
      candidate.votes += votes;
      state.totalVotes += votes;
      candidate.percentage = (candidate.votes / state.totalVotes) * 100;
    });

    console.log(state.candidates);
  }, 1000);
}

app.get('/', (req, res) => {
  res.json({ message: 'Acesse /votes' });
});

app.get('/votes', (req, res) => {
  const sortedCandidates = state.candidates.sort((a, b) => {
    return b.votes - a.votes;
  });

  res.json({ candidates: sortedCandidates, totalVotes: state.totalVotes });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

fillCandidates();
simulate();

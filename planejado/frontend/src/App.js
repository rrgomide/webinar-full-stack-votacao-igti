import React from 'react';

const formatter = Intl.NumberFormat('pt-BR');

function formatNumber(number) {
  return formatter.format(number);
}

function formatPercentage(number) {
  return number.toFixed(2).replace('.', ',') + '%';
}

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((resource) => resource.json())
        .then((json) => {
          this.setState({ candidates: json.candidates });
        });
    }, 1000);
  }

  render() {
    const { candidates } = this.state;

    if (candidates.length === 0) {
      return <p>Carregando...</p>;
    }

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Votação</h1>

        <div>
          {candidates.map((candidate, index) => {
            const { id, name, votes, percentage } = candidate;
            const position = index + 1;
            const imageURL = id + '.jpg';

            return (
              <div className="card flex-row" key={id}>
                <span className="position">{position}</span>
                <span className="img">
                  <img src={imageURL} alt={name} />
                </span>
                <ul>
                  <li className="name">{name}</li>
                  <li>{formatNumber(votes)}</li>
                  <li>{formatPercentage(percentage)}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

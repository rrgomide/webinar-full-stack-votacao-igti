import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
    };
  }

  render() {
    const { candidates } = this.state;

    if (candidates.length === 0) {
      return <p>Carregando...</p>;
    }

    return (
      <ul>
        {candidates.map((candidate) => {
          const { id, name, votes, percentage } = candidate;
          return (
            <li key={id}>
              {name} | {votes} | {percentage}
            </li>
          );
        })}
      </ul>
    );
  }

  async componentDidMount() {
    setInterval(async () => {
      const res = await fetch('http://localhost:8080/votes');
      const json = await res.json();

      this.setState({
        candidates: json.candidates,
      });
    }, 1000);
  }
}

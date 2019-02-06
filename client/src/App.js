import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false, beers: []}
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://localhost:8080/good-beers')
            .then(response => response.json())
            .then(data => this.setState({beers: data, isLoading: false}));
    }

    render() {
      const {beers, isLoading} = this.state;

      if (isLoading) {
          return <p>Loading...</p>;
      }

      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
              </header>
              <div>
                  <h2>Beer List</h2>
                  {beers.map(beer =>
                      <div key={beer.id}>
                          {beer.name}
                      </div>
                  )}
              </div>
          </div>
      );
  }
}

export default App;

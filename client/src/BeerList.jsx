import React, { Component } from 'react';
import GiphyImage from './GiphyImage';

class BeerList extends Component {

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
                <div>
                    <h2>Beer List</h2>
                    {beers.map(beer =>
                        <div key={beer.id}>
                            {beer.name}<br/>
                            <GiphyImage name={beer.name}/>
                        </div>
                    )}
                </div>
        );
    }

}
export default BeerList;
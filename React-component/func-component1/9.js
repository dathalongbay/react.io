import React, { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {greeting: 'Hello class component'};
    }

    componentDidMount() {

    }

    handleChange = (event) => {
        this.setState({greeting: event.target.value});
    }

    render() {
        return <Headline headline={this.state.greeting} onChangeHeadline={this.handleChange} />
    }

}

class Headline extends Component {

    render() {
        return (
            <div>
                <h1>{ this.props.headline }</h1>
                <input type="text" value={this.props.headline} onChange={this.props.onChangeHeadline} />
            </div>
        );
    }
}

export default App;
class ClassName extends Component {
    constructor(props) {
        super(props);
        this.state = {color: "red", brand: "honda"};
    }

    changeColor = () => {
        this.setState({color: "blue"});
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
        }, 1000)
    }
    render() {
        return (
            <div>
                <h2>I am a {this.state.color} {this.props.model} Car!</h2>
                <h1>My {this.state.brand}</h1>
                <p>
                    It is a {this.state.color}
                </p>
                <button
                    type="button"
                    onClick={this.changeColor}
                >Change color</button>
            </div>
        );
    }
}

export default ClassName;
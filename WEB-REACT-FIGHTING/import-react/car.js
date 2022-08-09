function functionName (props) {

    const [state, setState] = useState({color: "red", brand: "honda"});

    useEffect(() => {
        setTimeout(() => {
            setState({...state, favoritecolor: "yellow"})
        }, 1000)
    });

    const changeColor = () => {
        this.setState({color: "blue"});
    }

    return (
        <div>
            <h2>I am a {state.color} {props.model} Car!</h2>
            <h1>My {state.brand}</h1>
            <p>
                It is a {state.color}
            </p>
            <button
                type="button"
                onClick={changeColor}
            >Change color</button>
        </div>
    );
}

export default functionName;
function MyFunctionComponent() {
    return <input />;
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        // This will *not* work!
        return (
            <MyFunctionComponent ref={this.textInput} />
        );
    }
}
class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        // từ class cha gọi đến method của class con qua ref
        this.textInput.current.focusTextInput();
    }

    render() {
        return (
            <DemoChild ref={this.textInput} />
            );
    }
}
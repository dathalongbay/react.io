// Redux:
const ADD = 'ADD';
const EDIT = 'EDIT';
const DELETE = 'DELETE';

const addMessage = (message) => {
    return {
        type: ADD,
        message: message
    }
};
const editMessage = (index, message) => {
    return {
        type: EDIT,
        index: index,
        message: message
    }
};
const deleteMessage = (index) => {
    return {
        type: DELETE,
        index: index
    }
};

const messageReducer = (state = [], action) => {
    let copyState = [...state];
    switch (action.type) {
        case ADD:
            return [...state, action.message];
            break;
        case EDIT:
            copyState[action.index] = action.message;
            return copyState;
            break;
        case DELETE:
            copyState.splice(action.index, 1)
            return copyState;
            break;
        default:
            return state;
    }
};

const store = Redux.createStore(messageReducer);




// React:
class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.submitMessage();
        }
    }
    submitMessage() {
        if(this.state.input === ""){
            return
        }
        this.props.submitNewMessage(this.state.input);
        this.setState({
            input: '',
        });
    }

    render() {
        return (
            <div id = "toDoApp">
                <label id = "toDoTitle" for = "basic-input">
                    <h2 className = "text-monospace">Add new things To Do:</h2>
                </label>
                <div id = "toDoAdd" className = "input-group">
                    <input id = "basic-input" className = "form-control" type = "text"
                           placeholder = "Thing to do"
                           value = { this.state.input }
                           onChange = { this.handleChange }
                           onKeyPress = { this.handleKeyPress }/>
                    <div className = "input-group-append">
                        <button className = "btn btn-outline-primary"
                                onClick = { this.submitMessage }>
                            Add
                        </button>
                    </div>
                </div>
                { this.props.messages.length > 0 ? (
                        <List
                            messages = { this.props.messages }
                            editExistingMessage = { this.props.editExistingMessage }
                            deleteExistingMessage = { this.props.deleteExistingMessage }
                        />
                    ) :
                    <NoList/>
                }
            </div>
        );
    }
};


const List = (props) => {
    return(
        <div id = "toDoList">
            <label for = "basic-input">
                <span className = "text-monospace">Things to do:</span>
            </label>
            <div className = "list-group">
                {
                    props.messages.map( (x, i) => {
                        let rand = Math.floor((Math.random() * 10000) + 1);
                        let key = "id"+i+""+rand;
                        return (
                            <ListItem key = { key } text = { x }  index = { i }
                                      edit = { props.editExistingMessage }
                                      delete = { props.deleteExistingMessage }/>
                        )
                    })
                }
            </div>
        </div>
    )
}

const NoList = () => {
    return(
        <div id = "toDoList" className="d-flex align-items-center justify-content-center">
            <p className = "text-muted text-monospace mt-5">
                Your list is empty
            </p>
        </div>

    )
}

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itemInput: this.props.text,
        }
        this.itemInputChange = this.itemInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);


    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.editItem();
        }
    }


    itemInputChange(event){
        this.setState({
            itemInput: event.target.textContent
        });
    }

    editItem() {
        if(this.state.itemInput === ""){
            this.setState({
                itemInput: this.props.text
            });
            return
        }
        this.props.edit(this.props.index, this.state.itemInput );
    }

    deleteItem(){
        this.props.delete(this.props.index);
    }


    render(){
        return(
            <a
                className = "list-group-item list-group-item-action d-flex justify-content-between"
                href = "#" draggable="false">
        <span contenteditable="true"
              value = { this.state.itemInput }
              onInput = { this.itemInputChange }
              onKeyPress = { this.handleKeyPress }>
          { this.props.text }
        </span>
                <div className = "btn-group btn-group-sm" role = "group">
                    <button className = "btn btn-primary" type = "button"
                            onClick = { this.editItem }>
                        Rename
                    </button>
                    <button className = "btn btn-primary" type = "button"
                            onClick = { this.deleteItem }>
                        Delete
                    </button>
                </div>
            </a>
        );
    }
}

// React-Redux
const mapStateToProps = (state) => {
    let _state = localStorage.state ? localStorage.state : state;
    return { messages: _state }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewMessage: (message) => {
            dispatch(addMessage(message))
        },
        editExistingMessage: (index, message) => {
            dispatch(editMessage(index, message))
        },
        deleteExistingMessage: (index) => {
            dispatch(deleteMessage(index))
        },
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store = { store }>
                <Container />
            </Provider>
        );
    }
};

ReactDOM.render( <AppWrapper/>, document.getElementById('root') );
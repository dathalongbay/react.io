import { Component} from "react";
import Comment from './Components/Comment';
import './App.css';
import AddComment from "./Components/AddComment";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: []
        }
    }

    handleCommentsChange = (comments) => {
        this.setState({comments})
    }

    render(){
        return(
            <div className="container">
                <AddComment comments={this.state.comments} setComments={this.handleCommentsChange}/>
                <Comment comments={this.state.comments}/>

            </div> //comment , setComments burda proptan gelen parametreleri otomatik olarak getirir.
        )
    }
}


export default App;
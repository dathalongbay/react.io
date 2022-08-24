import React, {Component} from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                customerName: '',
                customerEmail: '',
                customerPhone: '',
                customerAddress: '',
                membershipPackage: 1,
                subscribeEmail: 1
            },
            messsage: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {

        // get type event : event.target.type
        // get id event : event.target.id
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        const {data} = this.state;
        const {customerName, customerEmail, customerPhone, customerAddress, membershipPackage, subscribeEmail} = data;

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                customerName,
                customerEmail,
                customerPhone,
                customerAddress,
                membershipPackage,
                subscribeEmail
            })
        };
        fetch('https://reqres.in/api/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.table(data);
                this.setState({
                    data: {
                        customerName: '',
                        customerEmail: '',
                        customerPhone: '',
                        customerAddress: '',
                        membershipPackage: 1,
                        subscribeEmail: 1
                    }
                });
                this.setState({messsage: 'Submit successfully :)'});
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label>customerName</label>
                    <input type="text" name="customerName" value={this.state.data.customerName}/>
                </div>

                <div>
                    <label>customerEmail</label>
                    <input type="text" name="customerEmail" value={this.state.data.customerEmail}/>
                </div>

                <div>
                    <label>customerPhone</label>
                    <input type="text" name="customerPhone" value={this.state.data.customerPhone}/>
                </div>

                <div>
                    <label>customerAddress</label>
                    <textarea name="customerAddress" id="customerAddress" cols="30"
                              rows="10">{this.state.data.customerAddress}</textarea>
                </div>

                <label>
                    membershipPackage:
                    <input
                        name="membershipPackage"
                        type="number"
                        value={this.state.data.membershipPackage}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    subscribeEmail :
                    <input
                        name="subscribeEmail"
                        type="checkbox"
                        checked={this.state.data.subscribeEmail}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        );
    }

}

export default App;
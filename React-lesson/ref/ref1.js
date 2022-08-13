import React, {Component} from 'react';

class RefComponent extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.submitRef = React.createRef();

        this.focusEmail = this.focusEmail.bind(this);
        this.focusPassword = this.focusPassword.bind(this);
    }

    focusEmail(){
        this.emailRef.current.focus();
    }

    focusPassword() {
        this.passwordRef.current.focus();
    }

    render() {
        return (
            <>
                <div>
                    <label>Email</label>
                    <input type="email" id="emailId" name="emailCtrl" onClick={this.focusEmail} ref={this.emailRef} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id="passwordId" name="passwordCtrl" onClick={this.focusPassword} ref={this.passwordRef} />
                </div>
                <div>
                    <button ref={this.submitRef}>Login</button>
                </div>

            </>
        );
    }

}
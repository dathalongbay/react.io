
function RefFunctionComponent(props) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const submitRef = useRef(null);

    function focusEmail(){
        emailRef.current.focus();
    }

    function focusPassword(){
        passwordRef.current.focus();
    }

    return (
        <>
            <div>
                <label>Email</label>
                <input type="email" id="emailId" name="emailCtrl" onClick={focusEmail} ref={emailRef} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" id="passwordId" name="passwordCtrl" onClick={focusPassword} ref={passwordRef} />
            </div>
            <div>
                <button ref={submitRef}>Login</button>
            </div>

        </>
    );
}

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
import * as React from 'react';
import { json, SetAccessToken, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import '../../scss/app';

class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: null,
            password: null,
            loginStatus: false
        };
    }

    private alert: JSX.Element = null;
    private loggingIn: boolean = false;

    componentDidMount() {
        if (User && (User.role === 'admin' || User.role === 'guest')) {
            this.props.history.push('/');
        }
    }

    async handleLoginSubmit(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        this.setState({ loginStatus: false });
        if (this.loggingIn) return;

        try {
            this.loggingIn = true;
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });


            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                window.location.reload(false);
            } else {
                this.setState({ loginStatus: true });
            }
        } catch (e) {
            this.setState({ loginStatus: true });
            throw e;
        } finally {
            this.loggingIn = false;
        }
    }

    render() {

        if (this.state.loginStatus) {
            this.alert = <div className="alert alert-danger p-1 m-3" role="alert">Invalid Credentials</div>
        }

        return (
            <div className="my-5 py-3 container text-center">
                <form className="form-signin">
                    <img className="mb-4" src="https://i.ytimg.com/vi/Fxi__sNIE1Q/maxresdefault.jpg" alt="" width="300px" height="180px" />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })} />

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} />

                    <button className="btn btn-lg btn-primary btn-block my-3" type="submit" onClick={(e) => this.handleLoginSubmit(e)}>Sign in</button>
                    {this.alert}
                    <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                </form>
            </div >
        );

    }

}

export interface ILoginProps extends RouteComponentProps<{ id: string }> { }

export interface ILoginState {
    email: string;
    password: string;
    loginStatus: boolean
}

export default Login;
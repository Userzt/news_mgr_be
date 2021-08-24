import { Redirect, Route } from "react-router-dom";


function LoginAuth(props) {
    let token = sessionStorage.getItem('token');
    if (token) {
        return (<Route {...props} />);
    } else {
        return (<Redirect to='/login' />)
    }
}

export default LoginAuth;
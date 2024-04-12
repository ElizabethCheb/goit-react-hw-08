import LoginForm from '../components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px' }}>Please log in or <Link
        style={{
          color: 'blue',
          textDecoration: 'underline'
        }} to="/register">register</Link></h2>
      <LoginForm />
    </div>
  );
}

export default Login;
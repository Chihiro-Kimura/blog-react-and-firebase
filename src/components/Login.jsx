import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

const Login = ({ setIsAuth }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      })
      .catch((err) => {
        setError('ログインに失敗しました。もう一度試してください。');
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <h1>ログイン</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={signInWithGoogle} disabled={loading}>
        {loading ? 'ログイン中...' : 'Googleでログイン'}
      </button>
    </div>
  );
};

export default Login;

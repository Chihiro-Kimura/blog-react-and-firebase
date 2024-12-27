import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Logout.css';

const Logout = ({ setIsAuth }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setLoading(true);
    firebaseSignOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        navigate('/logout-success'); // ログアウト成功ページに遷移
      })
      .catch((err) => {
        setError('ログアウトに失敗しました。もう一度試してください。');
        setLoading(false);
      });
  };

  return (
    <div className="logout-container">
      <h1>ログアウト</h1>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? 'ログアウト中...' : 'ログアウト'}
      </button>
    </div>
  );
};

export default Logout;

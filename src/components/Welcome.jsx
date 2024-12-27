import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ isAuth }) => {
  const navigate = useNavigate();

  // ユーザーが認証されているかどうかをチェック
  useEffect(() => {
    if (isAuth) {
      navigate('/home'); // ログイン済みならホームページにリダイレクト
    }
  }, [isAuth, navigate]);

  return (
    <div className="welcome-container">
      <h1>ようこそ！</h1>
      <p>このアプリを使用するにはログインが必要です。</p>
    </div>
  );
};

export default Welcome;

import { useNavigate } from 'react-router-dom';
import './LogoutSuccess.css';

const LogoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="logout-success-container">
      <h1>ログアウト完了</h1>
      <p>正常にログアウトしました。</p>
      <button onClick={() => navigate('/login')}>ログインページへ</button>
    </div>
  );
};

export default LogoutSuccess;

import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 投稿データの取得
  useEffect(() => {
    if (!isAuth) {
      return; // ログインしていない場合、データ取得しない
    }

    const getPosts = async () => {
      try {
        const posts = await getDocs(collection(db, 'posts'));
        setPostList(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (err) {
        setError('投稿データの取得中にエラーが発生しました');
        setLoading(false);
      }
    };

    getPosts();
  }, [isAuth]);

  // 投稿の削除
  const deletePost = async (id) => {
    const confirmDelete = window.confirm('本当にこの投稿を削除しますか？');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id)); // 状態から削除
        console.log('投稿が削除されました');
      } catch (err) {
        console.error('投稿の削除中にエラーが発生しました:', err);
        alert('削除中にエラーが発生しました');
      }
    }
  };

  // ローディング中
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">読み込み中...</p>
      </div>
    );
  }

  // エラーメッセージ
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">
          {error} <br />
          <strong>ログインが必要です。</strong>
        </p>
        <button onClick={() => navigate('/login')}>ログイン画面へ</button>
      </div>
    );
  }

  // ログインしていない場合に「ようこそ」メッセージ
  if (!isAuth) {
    return (
      <div className="welcome-container">
        <h1 className="welcome-title">ようこそ！</h1>
        <p className="welcome-message">このアプリを使用するにはログインが必要です。</p>
        <button className="login-button" onClick={() => navigate('/login')}>
          ログイン
        </button>
      </div>
    );
  }

  // 投稿リスト表示
  return (
    <div className="homePage">
      {postList.length === 0 ? (
        <div>投稿がありません</div>
      ) : (
        postList.map((post) => (
          <div className="postContents" key={post.id}>
            <div className="postHeader">
              <h1>{post.title || 'タイトルなし'}</h1>
            </div>
            <div className="postTextContainer">
              <p>{post.postText || '本文がありません'}</p>
            </div>
            <div className="nameAndDeleteButton">
              <h3>@{post.author?.username || '不明なユーザー'}</h3>
              {isAuth &&
                auth.currentUser &&
                post.author?.id &&
                auth.currentUser.uid === post.author?.id && (
                  <button onClick={() => deletePost(post.id)}>削除</button>
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

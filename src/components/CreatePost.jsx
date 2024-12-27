import './CreatePost.css';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 投稿中フラグ
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault(); // ページリロード防止

    if (!auth.currentUser) {
      console.error('ユーザーが認証されていません');
      return;
    }

    if (isSubmitting) {
      console.warn('すでに投稿中です');
      return;
    }

    setIsSubmitting(true); // 投稿中状態に変更

    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        postText: postText,
        author: {
          username: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      console.log('投稿が成功しました');
      navigate('/');
    } catch (err) {
      console.error('投稿中にエラーが発生しました:', err);
    } finally {
      setIsSubmitting(false); // 投稿後、投稿中状態を解除
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <form className="postContainer" onSubmit={createPost}>
        <h1>記事投稿</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="inputPost">
          <div>記事</div>
          <textarea
            placeholder="記事を入力してください"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <button className="submitButton" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '投稿中...' : '投稿'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

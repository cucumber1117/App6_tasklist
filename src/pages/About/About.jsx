import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';
import pkg from '../../../package.json';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className={`page page-about ${styles.container}`}>
  <div>
  <button className={styles.back} onClick={() => navigate(-1)} aria-label="戻る" title="戻る">←</button>
        <div className={styles.card}>
          <h2 className={styles.title}>アプリ情報</h2>

          <div className={styles.section}>
            <h3>アプリ名</h3>
            <p>{pkg.name}</p>
          </div>

          <div className={styles.section}>
            <h3>バージョン</h3>
            <p>{pkg.version}</p>
          </div>

          <div className={styles.section}>
            <h3>開発者</h3>
            <p>きゅうり</p>
          </div>

          <div className={styles.section}>
            <h3>アプリの説明</h3>
            <p>このアプリはネットワーク不要で使えるシンプルなタスク管理アプリです。日ごと・時刻ごとにタスクを整理できます。</p>
          </div>

          <div className={styles.section}>
            <h3>主な機能</h3>
            <ul>
              <p>日ごとのタスク管理（日時指定）</p>
              <p>タスクの追加・削除・完了切替</p>
              <p>カレンダーで日付を選択してタスク確認</p>
              <p>ローカルストレージによる永続化</p>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>保存方法</h3>
            <p>タスクはブラウザの <code className={styles.code}>localStorage</code> に保存されます。</p>
            <p>保存キー: <code className={styles.code}>app6:tasks</code></p>
          </div>

          <div className={styles.section}>
            <p className={styles.muted}>© {new Date().getFullYear()} {pkg.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

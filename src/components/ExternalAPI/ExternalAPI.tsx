import React, { useEffect, useState } from 'react';
import styles from './ExternalAPI.module.css';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const ExternalAPI: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Post;
    direction: 'ascending' | 'descending';
  } | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const sortedPosts = React.useMemo(() => {
    const sortablePosts = [...posts];
    if (sortConfig !== null) {
      sortablePosts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePosts;
  }, [posts, sortConfig]);

  const requestSort = (key: keyof Post) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('userId')}>User ID</th>
            <th onClick={() => requestSort('id')}>ID</th>
            <th onClick={() => requestSort('title')}>Title</th>
            <th onClick={() => requestSort('body')}>Body</th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

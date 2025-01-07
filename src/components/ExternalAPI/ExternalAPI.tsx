import { useEffect, useState, StrictMode, useMemo, type FC } from 'react';
import styles from './ExternalAPI.module.css';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const ExternalAPI: FC = () => {
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

  const sortedPosts = useMemo(() => {
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

  const getSortIndicator = (key: keyof Post) => {
    if (!sortConfig) {
      return null;
    }
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <StrictMode>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => requestSort('userId')}>
                User ID {getSortIndicator('userId')}
              </th>
              <th onClick={() => requestSort('id')}>
                ID {getSortIndicator('id')}
              </th>
              <th onClick={() => requestSort('title')}>
                Title {getSortIndicator('title')}
              </th>
              <th onClick={() => requestSort('body')}>
                Body {getSortIndicator('body')}
              </th>
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
    </StrictMode>
  );
};

import React from 'react';
import { Button } from 'antd';
import styles from './NotFound.less';
const NotFound = (location) =>
  <div className={styles.normal}>
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
    </div>
  </div>;

export default NotFound;

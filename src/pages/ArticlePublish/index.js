import React, { Component } from 'react'
import styles from './index.module.scss'
console.log(styles)
export default class ArticlePublish extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>文章发布组件</div>
        <ul className="list">
          <li className="item">123</li>
          <li className="item">234</li>
        </ul>
      </div>
    )
  }
}

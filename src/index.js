import React from 'react'
import ReactDOM from 'react-dom'
// 导入antd的全局样式
import 'antd/dist/antd.css'
// 自己的全局样式
import './index.css'
import App from './App'
import { ConfigProvider } from 'antd'

// 导入中文包
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
)

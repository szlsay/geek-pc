import React, { Component } from 'react'
import styles from './index.module.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { baseURL } from 'utils/request'
import { addAritcle, getArticleById, updateArticle } from 'api/article'
export default class ArticlePublish extends Component {
  state = {
    // 文章的封面类型
    type: 1,
    // 用于控制上传的图片以及图片的显示
    fileList: [],
    showPreview: false,
    previewUrl: '',
    // 编辑的id
    id: this.props.match.params.id,
  }
  formRef = React.createRef()
  render() {
    console.log(this.props.match)
    const { type, fileList, previewUrl, showPreview, id } = this.state
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            size="large"
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            initialValues={{
              content: '',
              type: type,
            }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章的标题不能为空',
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道',
                },
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 上传组件 */}
            <Form.Item wrapperCol={{ offset: 4 }}>
              {type !== 0 && (
                // fileList: 控制文件列表
                // action: 控制上传的url 保证是一个完整的url
                // name： 用于指定名字
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  action={`${baseURL}upload`}
                  name="image"
                  onChange={this.uploadImage}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload}
                >
                  {fileList.length < type && <PlusOutlined />}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '文章的内容不能为空',
                },
              ]}
            >
              <ReactQuill
                theme="snow"
                placeholder="请输入文章的内容"
              ></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  {id ? '编辑文章' : '发布文章'}
                </Button>
                <Button size="large" onClick={this.addDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* 弹窗，用于显示预览的图片 */}
        <Modal
          visible={showPreview}
          title="图片预览"
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewUrl} />
        </Modal>
      </div>
    )
  }
  async componentDidMount() {
    console.log('组件创建了')
    if (this.state.id) {
      // 需要发请求，获取文章详细信息
      const res = await getArticleById(this.state.id)
      const values = {
        ...res.data,
        type: res.data.cover.type,
      }
      // 给表单设置values值
      this.formRef.current.setFieldsValue(values)
      const fileList = res.data.cover.images.map((item) => {
        return {
          url: item,
        }
      })
      this.setState({
        fileList,
        type: res.data.cover.type,
      })
    }
  }
  componentWillUnmount() {
    console.log('组件销毁了')
  }
  changeType = (e) => {
    this.setState({
      type: e.target.value,
      fileList: [],
    })
  }

  // 注意：如果fileList是将来回显的，通过url就能够访问到
  // 如果fileList的文件是上传的，，，需要通过file.response.data.url
  handlePreview = (file) => {
    console.log(file)
    const url = file.url || file.response.data.url
    this.setState({
      showPreview: true,
      previewUrl: url,
    })
  }

  // 上传前的校验
  beforeUpload = (file) => {
    // console.log(file)
    // 判断图片的带下 不能超过 500k
    // debugger
    if (file.size >= 1024 * 500) {
      message.warn('上传的文件不能超过500kb')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或者png的图片')
      return Upload.LIST_IGNORE
    }
    return true
  }

  handleCancel = () => {
    this.setState({
      showPreview: false,
      previewUrl: '',
    })
  }

  uploadImage = ({ fileList }) => {
    // 把fileList修改到state中
    this.setState({
      fileList,
    })
  }
  async save(values, draft) {
    const { fileList, type } = this.state
    if (fileList.length !== type) {
      return message.warn('上传的图片数量不正确')
    }
    // 根据fileList得到
    const images = fileList.map((item) => {
      return item.url || item.response.data.url
    })
    if (this.state.id) {
      // 修改文章
      await updateArticle(
        {
          ...values,
          cover: {
            type,
            images,
          },
          id: this.state.id,
        },
        draft
      )
      message.success('修改成功')
    } else {
      // 添加文章
      await addAritcle(
        {
          ...values,
          cover: {
            type,
            images,
          },
        },
        draft
      )
      message.success('添加成功')
    }
    this.props.history.push('/home/list')
  }
  onFinish = async (values) => {
    this.save(values, false)
  }
  addDraft = async () => {
    const values = await this.formRef.current.validateFields()
    this.save(values, true)
  }
}

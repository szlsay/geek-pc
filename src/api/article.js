// 封装和文章相关的接口
import request from 'utils/request'

/**
 * 获取文章列表数据
 */
export const getArticles = (params) => {
  return request({
    url: '/mp/articles',
    method: 'get',
    params,
  })
}

/**
 * 删除文章接口
 * @param {*} id
 * @returns
 */
export const delArticle = (id) => {
  return request.delete(`/mp/articles/${id}`)
}

/**
 * 添加文章
 * @param {*} data
 * @returns
 */
export const addAritcle = (data, draft = false) => {
  return request({
    url: `/mp/articles?draft=${draft}`,
    method: 'post',
    data,
  })
}

/**
 * 获取文章详情信息
 * @param {*} id
 * @returns
 */
export const getArticleById = (id) => {
  return request.get(`/mp/articles/${id}`)
}

/**
 * 修改文章的接口
 * @param {*} data
 * @param {*} draft
 * @returns
 */
export const updateArticle = (data, draft) => {
  return request({
    url: `/mp/articles/${data.id}?draft=${draft}`,
    method: 'PUT',
    data,
  })
}

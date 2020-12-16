const { RESTDataSource } = require('apollo-datasource-rest');

/**
 * ArticlesAPIクラス
 * 
 * RESTで呼び出すライブラリであるRESTDataSourceを使用する
 */
class ArticleDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/'
  }

  async getArticles() {
    return this.get(`articles`);
  }

  async getArticle(id) {
    const data = await this.get(`articles/${id}`);
    return data;
  }
};

module.exports = ArticleDatasource;

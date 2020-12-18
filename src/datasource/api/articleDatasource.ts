import { RESTDataSource } from 'apollo-datasource-rest';

/**
 * ArticlesAPIクラス
 * 
 * RESTで呼び出すライブラリであるRESTDataSourceを使用する
 */
export class ArticleDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/'
  }

  async getArticles() {
    return this.get(`articles`);
  }

  async getArticle(id: string) {
    const data = await this.get(`articles/${id}`);
    return data;
  }
};

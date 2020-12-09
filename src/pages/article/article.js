import Axios from 'axios';
import React from "react";
import { Alert, Button, Form, Input, Table } from "reactstrap";
import ArticleDetail from './article-detail';
import './article.css';
import s from "./article.module.scss";

class Articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      article: null,
      showDetailPage: false,
      showManagePage: true,
      keyword: null
    }

    this.getArticles();
  }

  getArticles() {
    const token = localStorage.getItem('accessToken');
    Axios.get(`http://localhost:3069/article/articles-of-doctor`,{
      headers: {
        'x-access-token': `bearer ${token}` 
      },
      params: {
        keyword: this.state.keyword !== '' ? this.state.keyword : null
      }
    })
    .then((json) => this.setState({articles: json.data.data}))
    .catch((error) => Alert(error));
  }

  deleteArticle(articleId) {
    const token = localStorage.getItem('accessToken');
    Axios.delete(`http://localhost:3069/article/articles-of-doctor/${articleId}`, {
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.reload(false))
    .catch((error) => Alert(error));
  }

  previewArticle(article) {
    this.setState({article, showDetailPage: true, showManagePage: false})
  }

  render() {
    if (this.state.showManagePage) {
      return (
        <div className={s.root}>
          <div className="article-header">
            <Form className={``} inline onSubmit={e => { e.preventDefault(); this.getArticles()}}>
              <Input
                id="search-input"
                placeholder="Search"
                style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
                onChange={event => { this.setState({keyword: event.target.value});}}
              />
              <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button>
            </Form>
            <a href="#/app/articles/create">
              <Button color={"warning"} type="button" className="mr-xs" size="sm">
                Create new article 
              </Button>
            </a>
          </div>
          <Table responsive>
            <thead>
              <tr className="fs-sm">
                <th className="hidden-sm-down">#</th>
                <th className="hidden-sm-down">created at</th>
                <th className="hidden-sm-down">title</th>
                <th className="hidden-sm-down">content</th>
                <th className="hidden-sm-down">status</th>
                <th className="hidden-sm-down">actions</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.articles === [] ? <div>LOI</div> : this.state.articles.map((item, index) => (
                <tr className="fs-sm ">
                  <td className="hidden-sm-down ">{index + 1}</td>
                  <td className="hidden-sm-down article-cell create-at">{(new Date(item.createAt)).toString()}</td>
                  <td className="hidden-sm-down article-cell title">{item.title}</td>
                  <td className="hidden-sm-down article-cell">{item.content.slice(0, 300)}...</td>
                  <td className="hidden-sm-down article-cell">{item.status}</td>
                  <td className="hidden-sm-down">
                    <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.previewArticle(item); }}>
                      <a href="#">
                        <i className="fa fa-pencil"/>
                      </a>
                    </Button>
                    <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteArticle(item.id); }}>
                      <i className="fa fa-trash-o"/>
                    </Button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        </div>
      );
    }else if (this.state.showDetailPage) {
      return <ArticleDetail article={this.state.article}></ArticleDetail>
    }
  }
}

export default Articles;

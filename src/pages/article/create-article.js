import Axios from 'axios';
import React from "react";
import { Alert, Button } from "reactstrap";
import './create-article.css';
import s from "./article.module.scss";

class CreateArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: null,
        content: null,
        categories: [],
        tags: []
    }
  }

  createArticle(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/article`, {
      title: this.state.title,
      content: this.state.content,
      categories: this.state.categories,
      tags: this.state.tags
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/articles")
    .catch((error) => Alert(error));
  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="article-line">
                <span className="article-key">Title:</span>
                <textarea 
                    className="article-value"
                    value={this.state.title}
                    rows = "3"
                    cols = "110"
                    placeholder="Input title..."
                    onChange={event => { this.setState({title: event.target.value})}}
                />
            </div>
            <div className="article-line2">
                <span className="article-key">Categories:</span>
                <input 
                    className="article-value"
                    value={this.state.categories}
                    type="text"
                    placeholder="Input categories..."
                    onChange={event => { this.setState({categories: event.target.value})}}
                />
            </div>
            <div className="article-line2">
                <span className="article-key">Tags:</span>
                <input 
                    className="article-value"
                    value={this.state.tags}
                    type="text"
                    placeholder="Input tags..."
                    onChange={event => { this.setState({tags: event.target.value})}}
                />
            </div>
            <div className="article-line">
                <span className="article-key">Content:</span>
                <textarea 
                    className="article-value"
                    value={this.state.content}
                    rows = "20"
                    cols = "110"
                    placeholder="Input content..."
                    onChange={event => { this.setState({content: event.target.value})}}
                />
            </div>
            <div className="button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createArticle(e)}>Save</Button>
                <a href="#/app/articles">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm">
                    Cancel
                  </Button>
                </a>
            </div>
        </form>
      </div>
    );
  }
}

export default CreateArticles;

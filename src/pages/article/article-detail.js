import Axios from 'axios';
import React from 'react';
import './article.css';
import { Button } from "reactstrap";

class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          title: null,
          categories: null,
          tags: null,
          content: null
        }
    }

    updateArticle(articleId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/article/${articleId}`, {
            title: this.state.title ? this.state.title : undefined,
            content: this.state.content ? this.state.content : undefined,
            categories: this.state.categories ? this.state.categories.split(',').map((item) => item.trim()) : undefined,
            tags: this.state.tags ? this.state.tags.split(',').map((item) => item.trim()) : undefined
        }, {
            headers: {
                'x-access-token': `bearer ${token}`
            }
        })
        .then(() => window.location.reload(false))
        .catch((error) => alert(error));
    }

    back = (e) => {
        e.preventDefault();

        // window.location.href = "#/app/manage-article"

        window.location.reload(false);
    }

    render() {
        if (!this.props.article) {
            alert('opp. Some thing wen\'t wrong')
        }
        return(
            <div className="">
                <form >
                    <div className="article-line">
                        <span className="article-key">Title:</span>
                        <textarea 
                            className="article-value"
                            defaultValue={this.props.article ? this.props.article.title : null}
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
                            defaultValue={this.props.article.categories === [] ? null : this.props.article.categories.map((item) => (
                                `${item.name}, `
                            )) }
                            type="text"
                            onChange={event => { this.setState({categories: event.target.value})}}
                        />
                    </div>
                    <div className="article-line2">
                        <span className="article-key">Tags:</span>
                        <input 
                            className="article-value"
                            defaultValue={this.props.article.tags === [] ? null : this.props.article.tags.map((item) => (
                                `${item.name}, `
                            )) }
                            type="text"
                            onChange={event => { this.setState({tags: event.target.value})}}
                        />
                    </div>
                    <div className="article-line">
                        <span className="article-key">Content:</span>
                        <textarea 
                            className="article-value"
                            defaultValue={this.props.article.content}
                            rows = "20"
                            cols = "110"
                            placeholder="Input content..."
                            onChange={event => { this.setState({content: event.target.value})}}
                        />
                    </div>
                    <div className="button">
                        <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.updateArticle(this.props.article.id)}}>Save</Button>
                        <a href="#/app/articles">
                        <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.back(e)}>
                            Cancel
                        </Button>
                        </a>
                    </div>
                </form>
            </div>
        )
    }
}

export default ArticleDetail;

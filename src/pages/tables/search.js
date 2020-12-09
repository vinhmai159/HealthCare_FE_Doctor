import React from 'react';
import { Button } from 'reactstrap';
import './search.css';
// import '../css/serach.css';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            timeSlot: ''
        };
    }

    onFormSubmit = (event) => {
        event.preventDefault();


        // sent term to app class component.
        this.props.onSubmit(this.state.day, this.state.timeSlot);
    }

    render() {
        return (
            <div className = "search-form">
               <form onSubmit = {this.onFormSubmit}>
                    <div className = "search-title">
                        <input 
                            className = "search-input" 
                            type = "text" 
                            value = {this.state.day} 
                            onChange = {(event) => this.setState({day: event.target.value })}
                            placeholder = "Day of week..."
                        />
                        <input 
                                className = "search-input" 
                                type = "text" 
                                value = {this.state.timeSlot} 
                                onChange = {(event) => this.setState({timeSlot: event.target.value })}
                                placeholder = "Time slot..."
                        />
                        <Button className="color" >submit</Button>
                    </div>
               </form>
            </div>
        );
    }
}

export default Search;
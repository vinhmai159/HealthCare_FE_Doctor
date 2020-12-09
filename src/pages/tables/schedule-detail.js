import React from 'react';
import Axios from 'axios';
import { Alert, Button } from 'reactstrap';
import './schedule-detail.css';

class ScheduleDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            booking: null,
            symptoms: "",
            diagnostic: "",
            prescription: ""
        };

        this.getUser(this.props.scheduleId);
    }

    getUser = (scheduleId) => {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/booking/get-one', {
            headers: {
                'x-access-token': `bearer ${token}` 
            },
            params: {
                scheduleId
            }
        })
        .then((json) => this.setState({booking: json.data}))
        .catch((error) => Alert(error));
    }

    completeMedicalRecord(bookingId, scheduleId) {
        const token = localStorage.getItem('accessToken');
        Axios.put('http://localhost:3069/booking/complete-medical-record', {
            symptoms: this.state.symptoms,
            diagnostic: this.state.diagnostic,
            prescription: this.state.prescription
        }, {
            headers: {
                'x-access-token': `bearer ${token}` 
            },
            params: {
                bookingId, scheduleId, status: 'DONE'
            }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
    }

    handleRefresh = (e) => {
        e.preventDefault();

        window.location.reload(false)
    }

    render() {
        if (!this.props.showScheduleDetail) {
            return null;
        }
        return ( 
            <div className="user-detail">
                <form onSubmit={this.completeMedicalRecord(this.state.booking.id, this.props.scheduleId)}>
                    <div >
                        <div className="user-detail-row">
                            <span className="key">fullName:</span>
                            <span className="value">{this.state.booking.user.fistName}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">birthday:</span>
                            <span className="value">{this.state.booking.user.birthday}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">gender:</span>
                            <span className="value">{this.state.booking.user.gender}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">address:</span>
                            <span className="value">{this.state.booking.user.address}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">examination schedule:</span>
                            <span className="value">Mai The Vinh</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key input">symptoms:</span>
                            <textarea 
                                className = "" 
                                rows = "3"
                                cols = "25"
                                onChange = {(event) => this.setState({symptoms: event.target.value })}
                                placeholder = "input symptoms..."
                            ></textarea>
                        </div>
                        <div className="user-detail-row">
                            <span className="key input">diagnostic:</span>
                            <textarea 
                                className = "" 
                                rows = "2"
                                cols = "25"
                                onChange = {(event) => this.setState({diagnostic: event.target.value })}
                                placeholder = "input diagnostic..."
                            />
                        </div>
                        <div className="user-detail-row">
                            <span className="key input">prescription:</span>
                            <textarea 
                                className = "" 
                                rows = "3"
                                cols = "25"
                                onChange = {(event) => this.setState({prescription: event.target.value })}
                                placeholder = "input prescription..."
                            />
                        </div>
                    </div>
                    <div className="schedule-action">
                        <Button color={"warning"} type="button" className="mr-xs" size="sm">Complete examination process</Button>
                        <Button color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ScheduleDetail;
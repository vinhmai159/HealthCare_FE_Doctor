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

    completeMedicalRecord(e, bookingId, scheduleId) {
        const token = localStorage.getItem('accessToken');
        Axios.post('http://localhost:3069/booking/complete-medical-record', {
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
        .catch((error) => alert(error.response.data.message));
    }

    rejectBooking(e, bookingId, scheduleId) {
        const token = localStorage.getItem('accessToken');
        Axios.post('http://localhost:3069/booking/reject-booking', {}, {
            headers: {
                'x-access-token': `bearer ${token}` 
            },
            params: {
                bookingId, scheduleId
            }
        })
        .then(() => window.location.reload(false))
        .catch((error) => alert(error.response.data.message));
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
                <form inline >
                    <div >
                        <div className="user-detail-row">
                            <span className="key">Date:</span>
                            <span className="value">{new Date(this.state.booking.date).toString().slice(0,16)}</span>
                            <Button color={"warning"} type="button" className="margin-20 mr-xs" size="sm" onClick={e => this.rejectBooking(e, this.state.booking.id, this.props.scheduleId)}>
                                Expired
                            </Button>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">FullName:</span>
                            <span className="value">{this.state.booking.user.fistName} {this.state.booking.user.lastName}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">Birthday:</span>
                            <span className="value">{this.state.booking.user.birthday}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">Gender:</span>
                            <span className="value">{this.state.booking.user.gender}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key">Address:</span>
                            <span className="value">{this.state.booking.user.address}</span>
                        </div>
                        <div className="user-detail-row">
                            <span className="key"><strong>Examination schedule</strong></span>
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
                        <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.completeMedicalRecord(e, this.state.booking.id, this.props.scheduleId)}>Complete examination process</Button>
                        <Button color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ScheduleDetail;
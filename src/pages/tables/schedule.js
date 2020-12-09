import React from 'react';
import axios from 'axios';
import { Alert, Button } from "reactstrap";
import ScheduleDetail from './schedule-detail';

class Schedule extends React.Component {
    constructor(props) {
        super();

        this.state = {
            showScheduleDetail: false
        };
    }

    deleteSchedule(calenderId) {
        const token = localStorage.getItem('accessToken');
        axios.delete(`http://localhost:3069/schedule/delete/${calenderId}`, {
            headers: {
                'x-access-token': `bearer ${token}` 
              }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
    }
    
    emptySchedule() {
        return <td><div className="emptySchedule">Empty</div></td> 
    }

    availableSchedule(calenderId) {
        return <td className="">
            <span className="availableSchedule">Available</span>
            <Button className="topFlexItem removeButton" onClick={e =>{ e.preventDefault(); this.deleteSchedule(calenderId)}}>X</Button>
        </td> 
    }
    
    bookedSchedule(schedule) {
        return <td>
            <Button className="bookedSchedule" onClick={e => {e.preventDefault(); this.scheduleDetail(); }} >Booked</Button>
            <div>
                  <ScheduleDetail showScheduleDetail={this.state.showScheduleDetail} scheduleId={schedule.scheduleId}></ScheduleDetail>
            </div>
        </td> 
    }

    scheduleDetail = e => {
        this.setState({
            showScheduleDetail: true
        });
    }

    render() {
        if (this.props.schedules.length === 0) {
            return this.emptySchedule() 
        }else {
            const validSchedule = this.props.schedules.find((item) => item.timeSlot === this.props.timeSlot.name);
            if (validSchedule === null || validSchedule === undefined) {
                return this.emptySchedule()
            } else {
                return validSchedule.busy ? this.bookedSchedule(validSchedule) : this.availableSchedule(validSchedule.calenderId)
            }
        }
    }
}

export default Schedule;
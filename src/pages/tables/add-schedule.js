import React from 'react';
import Axios from 'axios';
import { isNil } from 'lodash';
import { Button, Table } from 'reactstrap';
import './search.css';

class AddSchedule extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            calenders: [],
            day: '',
            timeSlot: '',
            calenderIds: []
        };
        this.ids = this.state.calenderIds;

        this.calenderIds = []
        this.onSearchSubmit();
    }

    componentWillMount = () => {
    }

    onSearchSubmit = async (day, timeSlotName) => {
        await Axios.post('http://localhost:3069/calender', {
            day: !isNil(day) ? day : null ,
            timeSlotName: !isNil(timeSlotName) ? timeSlotName : null
        })
        .then((json) => this.setState({calenders: json.data}))
        .catch((error) => console.log(error));

    }

    updateScheduleIds = (value) => {
        // if (this.calenderIds.has(value.id)) {
        //     this.calenderIds.delete(value.id);
        // } else {
        //     this.calenderIds.add(value.id);
        // }

        this.calenderIds.push(value);

        // this.setState({calenderIds: this.ids.push(...value.id)})
    }

    addSchedules = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('accessToken');
        Axios.post('http://localhost:3069/schedule/create-many', {
            calenderIds: this.calenderIds
        }, 
        {
            headers: {
                'x-access-token': `bearer ${token}` 
              },
        })
        .then(() => window.location.reload(false))
        .catch((error) => console.log(error));
    }

    handleRefresh = (e) => {
        e.preventDefault();

        window.location.reload(false)
    }

    render() {
        if(!this.props.showAddSchedule){
            return null;
        }
        return (
            <div>
                {/* <div className="hide-tables add-schedule-component"></div> */}
                <div className="add-schedule-component">
                    <div className="query-input">
                        <form onSubmit ={e => {e.preventDefault(); this.onSearchSubmit(this.state.day, this.state.timeSlot);}}>
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
                                <Button className="color" type="submit">submit</Button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="calender-output">
                        <form onSubmit={this.addSchedules}>
                            <frameElement className="calender-frame">
                            <div className="data calender-frame">
                                <Table responsive>
                                    <tbody>
                                        {this.state.calenders.map((item) => (
                                            <tr className="fs-sm ">
                                                <td className="hidden-sm-down">{item.day}</td>
                                                <td className="hidden-sm-down">{item.timeslot.name}</td>
                                                <td><input 
                                                    className="select-calender" 
                                                    type="checkbox"
                                                    value={item.id}
                                                    onChange={(event) => this.updateScheduleIds(event.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            </frameElement>
                            <div className="button">
                                <Button color={"warning"} className="mr-xs" size="sm">
                                    Save
                                </Button>
                                <Button onClick={this.handleRefresh} > Cancel </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSchedule;

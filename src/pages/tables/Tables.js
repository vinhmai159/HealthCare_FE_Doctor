import Axios from 'axios';
import React from "react";
import {
  Button, Col,DropdownItem, DropdownMenu,
  DropdownToggle, Row,Table,UncontrolledButtonDropdown
} from "reactstrap";
import Modal from 'react-modal';
import Widget from "../../components/Widget";
import Schedule from './schedule';
import AddSchedule from './add-schedule';
import ScheduleDetail from './schedule-detail';
import './tables.css';
import s from "./Tables.modules.scss";
import LinksGroup from '../../components/Sidebar/LinksGroup/LinksGroup';
import { Link } from 'react-router-dom';

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSlot: [],
      schedules: {
        "MONDAY": [],
        "TUESDAY": [],
        "WEDNESDAY": [],
        "THURSDAY": [],
        "FRIDAY": [],
        "SATURDAY": [],
        "SUNDAY": []
      },
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
      showAddSchedule: false
    };

    this.checkAll = this.checkAll.bind(this);

    const token = localStorage.getItem('accessToken');
    Axios.get('http://localhost:3069/timeslot', {
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then((json) => this.setState({ timeSlot: json.data}))
    .catch((error) => console.log(error))
    Axios.get('http://localhost:3069/schedule/get-schedule-for-doctor', {
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then((json) => this.setState({ schedules: json.data}))
    .catch((error) => console.log(error));
  }

  async componentWillMount() {
    
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox]
    });
  }

  showAddSchedule = e => {
    this.setState({
      showAddSchedule: true
    });
  };

  async saveSchedule(calenderIds) {
    await Axios.post('http://localhost:3069/schedule/create-many', {
      calenderIds
    }).catch((error) => alert('Somethings went wrong, Cannot add any schedule!'));

    return true;
  }

  render() {
    return (
      <div className={`${s.root}`}>
        <Row >
          <Col>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Calender per weekly</p>}
              customDropDown
            >
              <Table responsive>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">Time</th>
                    <th className="hidden-sm-down">Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th className="hidden-sm-down">thursday</th>
                    <th className="hidden-sm-down">Friday</th>
                    <th className="hidden-sm-down">Saturday</th>
                    <th className="hidden-sm-down">Sunday</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.timeSlot.map((item) => (
                    <tr className="fs-sm ">
                      <td className="hidden-sm-down">{item.name}</td>
                      <Schedule schedules={this.state.schedules.MONDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.TUESDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.WEDNESDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.THURSDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.FRIDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.SATURDAY} timeSlot={item}></Schedule>
                      <Schedule schedules={this.state.schedules.SUNDAY} timeSlot={item}></Schedule>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {this.showAddSchedule();}}>
                      Add more schedules
                  </Button>
                  {/* <Link to="/app/tables/add-schedule">
                    <Button color={"warning"} className="mr-xs" size="sm" >
                        Add more schedules
                    </Button>
                  </Link> */}
                  
                  {/* <UncontrolledButtonDropdown>
                    <DropdownToggle
                      className="mr-xs"
                      size="sm"
                      caret
                      color={"default"}
                    >
                      Clear
                    </DropdownToggle>
                    <DropdownMenu style={{marginRight: 120}}>
                      <DropdownItem>Clear</DropdownItem>
                      <DropdownItem>Move ...</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown> */}
                </div>
                {/* <p>Basic table with styled content</p> */}
              </div>
              <div className="add-schedule-frame">
                <AddSchedule showAddSchedule={this.state.showAddSchedule} />
              </div>
              <div className="test">
                  <ScheduleDetail showScheduleDetail={this.state.showScheduleDetail}></ScheduleDetail>
              </div>
              
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tables;

import Axios from 'axios';
import React from "react";
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './account.css';
import s from "./account.module.scss";
import UpdateAccount from './update-account';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctor: null,
      showUpdatePage: false,
      showManagePage: true
    }

    this.getDoctorAccount();
  }

  getDoctorAccount() {
    const token = localStorage.getItem('accessToken');
    Axios.get(`http://localhost:3069/doctor/account`,{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then((json) => this.setState({doctor: json.data}))
    .catch((error) => alert(error));
  }

  updateAccount(e) {
    e.preventDefault();

    this.setState({ showUpdatePage: true, showManagePage: false})
  }

  render() {
    if (this.state.showManagePage) {
      return (
        <div className={s.root}>
          <div className="article-header">
            <Form className={``} inline onSubmit={e => { e.preventDefault(); this.getArticles()}}>
              {/* <Input
                id="search-input"
                placeholder="Search"
                style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
                onChange={event => { this.setState({keyword: event.target.value});}}
              />
              <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button> */}
            </Form>
            <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.updateAccount(e)}>
              Update my account
            </Button>
          </div>
          <div className="account-info">
              <div className="account-info-row">
                <div className="account-info-key">Email:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.email}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Fist name:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.fistName}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Last name:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.lastName}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Description:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.description}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">address:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.addressDetail}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Expertise:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.expertise && this.state.doctor.expertise.name}</div>
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Hospital:</div>
                <div className="account-info-value">{this.state.doctor && this.state.doctor.hospital && this.state.doctor.hospital.name}</div>
              </div>
          </div>
        </div>
      );
    }else if (this.state.showUpdatePage) {
      return <UpdateAccount doctor={this.state.doctor}></UpdateAccount>
    }
  }
}

export default Account;

import Axios from 'axios';
import React from "react";
import { Button } from "reactstrap";
import './account.css';

class UpdateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctor: null,
      fistName: null,
      lastName: null,
      description: null,
      addressDetail: null
    }

    this.setState({doctor: this.props.doctor})

    // this.getDoctorAccount();
  }

  updateAccount() {
    const token = localStorage.getItem('accessToken');
    Axios.put(`http://localhost:3069/doctor/update`, {
        fistName: this.state.fistName ? this.state.fistName : undefined,
        lastName: this.state.lastName ? this.state.lastName : undefined,
        description: this.state.description ? this.state.description : undefined,
        addressDetail: this.state.addressDetail ? this.state.addressDetail : undefined
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
    if (!this.props.doctor) {
      alert('opp. Some thing wen\'t wrong')
    }
      return (
        <div className={''}>
          <form className="account-info">
              <div className="account-info-row">
                <div className="account-info-key">Fist name:</div>
                <input 
                  className="account-info-input-short"
                  defaultValue={this.props.doctor.fistName}
                  type="text"
                  onChange={event => { this.setState({fistName: event.target.value})}}
                />
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Last name:</div>
                <input 
                  className="account-info-input-short"
                  defaultValue={this.props.doctor.lastName}
                  type="text"
                  onChange={event => { this.setState({lastName: event.target.value})}}
                />
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Description:</div>
                <textarea 
                  rows="3"
                  cols="60"
                  defaultValue={this.props.doctor.description}
                  onChange={event => { this.setState({description: event.target.value})}}
                />
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">address:</div>
                <textarea 
                  rows="3"
                  cols="60"
                  defaultValue={this.props.doctor.addressDetail}
                  onChange={event => { this.setState({addressDetail: event.target.value})}}
                />
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Expertise:</div>
                <input 
                  className="account-info-input"
                  defaultValue={this.props.doctor.expertise && this.props.doctor.expertise.name}
                />
              </div>
              <hr/>
              <div className="account-info-row">
                <div className="account-info-key">Hospital:</div>
                <input 
                  className="account-info-input"
                  defaultValue={this.props.doctor.hospital && this.props.doctor.hospital.name}
                />
              </div>
              <div className="update-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.updateAccount()}}>Save</Button>
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.back(e)}>
                    Cancel
                </Button>
              </div>
          </form>
        </div>
      );
  }
}

export default UpdateAccount;

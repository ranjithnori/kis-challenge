import React, { Component } from "react";
import kisi from "kisi-client";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { getUserLocksRequest } from "../reducers/userLocks";
import GetUserLocksActions from "../reducers/userLocks";

import APIConstants from "../constants/APIConstants";
import UIConstants from "../constants/UIConstants";
import Lock from "./Lock";

class LocksList extends Component {
  componentDidMount() {
    this.getLocks();
  }

  getLocks = () => {
    this.props.getUserLocksRequest({});
  };

  handleUnlock = item => {
    this.props.unlockRequest(item);
  };

  render() {
    console.log(this.props.userLocksState.locks);

    // API data fetching & Empty case
    if (
      this.props.userLocksState.getUserLocksAPIStatus ===
      APIConstants.API_FETCHING
    ) {
      return (
        <Typography color="textSecondary">
          {UIConstants.FETCHING_LOCKS}
        </Typography>
      );
    } else if (
      this.props.userLocksState.getUserLocksAPIStatus ===
      APIConstants.API_SERVER_ERROR
    ) {
      return (
        <Typography color="textSecondary">
          {UIConstants.FAILED_TO_FETCH_LOCKS}
        </Typography>
      );
    } else if (this.props.userLocksState.lockIds.length === 0) {
      return (
        <Typography color="textSecondary">
          {UIConstants.NO_LOCKS_TO_DISPLAY}
        </Typography>
      );
    }

    const locks = this.props.userLocksState.lockIds.map(id => {
      const item = this.props.userLocksState.locks[id];
      let handleUnlock = () => this.handleUnlock(item);
      console.log(item);
      return (
        <Lock
          key={item.id}
          name={item.name}
          unlocked={item.unlocked}
          apiStatus={item.unlockAPIStatus}
          handleUnlock={handleUnlock}
        />
      );
    });
    return <div>{locks}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userLocksState: state.userLocks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserLocksRequest: (...args) =>
      dispatch(GetUserLocksActions.getUserLocksRequest(...args)),
    unlockRequest: (...args) =>
      dispatch(GetUserLocksActions.unlockRequest(...args))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocksList);

// Individual lock component

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import APIConstants from "../constants/APIConstants";
import UIConstants from "../constants/UIConstants";

const styles = {
  card: {
    display: "flex",
    marginBottom: "1.5rem"
  },
  title: {
    fontSize: 14
  }
};

class Lock extends PureComponent {
  renderUnlockButton = () => {
    const { classes, handleUnlock, unlocked, apiStatus } = this.props;

    if (apiStatus === APIConstants.API_SUCCESS) {
      return null;
    } else if (apiStatus === APIConstants.API_FETCHING) {
      return (
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {UIConstants.UNLOCKING}
        </Typography>
      );
    } else if (apiStatus === APIConstants.API_SERVER_ERROR) {
      return (
        <CardActions>
          <Button onClick={handleUnlock} size="small">
            {UIConstants.FAILED_PLEASE_RETRY}
          </Button>
        </CardActions>
      );
    } else {
      return (
        <CardActions>
          <Button onClick={handleUnlock} size="small">
            {UIConstants.UNLOCK}
          </Button>
        </CardActions>
      );
    }
  };

  render() {
    const { classes, name } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {name}
          </Typography>
        </CardContent>
        {this.renderUnlockButton()}
      </Card>
    );
  }
}

export default withStyles(styles)(Lock);

import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import Modal from "../shared/modal/Modal";
import { myFirebase } from "../../Config/MyFirebase.js";

class ResetPassword extends Component {
  state = {
    email: null,
  };

  resetPassword = (event) =>{
    event.preventDefault();
    const emailAddress = this.state.email;

    myFirebase.auth().sendPasswordResetEmail(emailAddress).then(()=>{
        alert(`An Email has been sent to ${emailAddress} containing link to proceed further.`)
    })
    .catch(function(error) {
       alert(error.message); 
    });
  }

  setText = (evt) => {
    this.setState({ email: evt.target.value });
  };

  render() {
      const {email} = this.state;
    return (
      <Modal
        title="Forgot Password"
        visible={this.props.visible}
        dismissCallback={this.props.dismissCallback}
      >
        <FormControl style={{width: '100%'}}>
          <TextField
            onChange={this.setText}
            value={email}
            label="Email"
            name="password"
            variant="outlined"
            type="email"
            style={{ marginBottom: "15px" }}
            fullWidth
          />
          <Button
              type="submit"
              value="SAVE"
              color="primary"
              fullWidth
              variant="contained"
              style={{ textTransform: "none", fontSize: "16px" }}
              onClick={this.resetPassword}
            >
                Reset Password
            </Button>
        </FormControl>
      </Modal>
    );
  }
}

export default ResetPassword;

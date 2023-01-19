import {Formik} from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ChangePasswordForm } from "../../pages/Account/ChangePassword";
import { LOADING, SHOW_MODAL } from "../../Redux/types";
import { changeUserPassword } from "../../Services/apis";
import { toast } from "react-toastify";

const ChangePasswordSchema = Yup.object().shape({
  new_password: Yup.string()
      .min(3, "Minimum 4 letters")
      .required("Enter a new password"),
  conf_password: Yup.string()
      .min(3, "Minimum 4 letters")
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required("Confirm your new password"),
});


export const ChangePasswordModal = ({ user_id, dispatch }) => {

  const submitForm = (values, {setSubmitting}) => {
    dispatch({type: LOADING});

    changeUserPassword(values).then(res => {
      setSubmitting(false);
      dispatch({type: LOADING});

      if(res.success) {
          toast.success('Password has been changed successfully.');
          dispatch({type: SHOW_MODAL, payload:null});
      } else {
          toast.error(res.message)
      }
  }).catch(err=> {
      setSubmitting(false);
      dispatch({type: LOADING});
  })
}

  return (
      <Formik
        enableReinitialize={true}
        initialValues={{
            new_password: '',
            conf_password: '',
            user_id
        }}
        validationSchema={ChangePasswordSchema}
        children={(props) => <ChangePasswordForm {...props} user_id={user_id} />}
        onSubmit={submitForm}
      />

  );
}
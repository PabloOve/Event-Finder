import React from 'react';
import {Box, Card, CardContent} from '@material-ui/core'
import {Form, Formik, Field} from 'formik';
import {connect, useSelector, useDispatch} from 'react-redux'
import {TextField} from 'formik-material-ui';
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom"
import * as Yup from 'yup';

function SignInForm() {

  const loginUser = useDispatch()
  let history = useHistory()
  const validate = Yup.object().shape({
    email: Yup.string()
        .email("Incorrect email format")
        .required("Please enter a valid email"),
    password: Yup.string()
        .required("Enter a password")
        .min(8,"Password is too short - should be 8 characters minimum")
        .matches(/(?=.*[0-9])/,"Password must contain at least a number"),
        confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    
})

    return (
      
      <div className = "card text-center" >
        <CardContent>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema ={validate}
        onSubmit={(values,{setSubmitting}) => {
          setSubmitting(true)
          loginUser({type: 'LOGIN'});
          history.push(`/`)
        }}
        >
        {({handleSubmit}) => (
          
            <div class="card"> 
            
            <h4 class="card-header">Sign In</h4>
            <br/>
            <Form onSubmit={handleSubmit}>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Email" component={TextField} name="email" type="email"/>
            </Box>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Password" component={TextField} name="password" type="password" />
            </Box>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Confirm Password" component={TextField} name="confirmPassword" type="password"/>
            </Box>
          <button className="btn btn-success mt-3" type="submit">Login</button>
          <br/>
          <p className="forgot-password text-right">
                                    Not a member yet? <a href="/sign_up">Sign up for free</a>
                                </p>
          </Form>
          </div>
          
        )
        
        }
        
      </Formik>
      </CardContent>
      </div>
      
    );
    
  }





export default (SignInForm);
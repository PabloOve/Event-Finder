import React from 'react';
import {Formik, Form, Field} from 'formik';
import {Box, Card, CardContent} from '@material-ui/core'
import {connect, useSelector, useDispatch} from 'react-redux'
import {useHistory} from "react-router-dom"
import {TextField} from 'formik-material-ui';
import * as Yup from 'yup';

function SignUpForm() {

  const loginUser = useDispatch()
  let history = useHistory()

  const validate = Yup.object().shape({
    firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
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
      
      <div className="card text-center">
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
            
            <h4 class="card-header">Sign Up</h4>

            <Form onSubmit={handleSubmit}>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="First Name" name="firstName" component={TextField} type="text"/>
            </Box>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Last Name" name="lastName" component={TextField} type="text"/>
            </Box>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Email" name="email" component={TextField} type="email"/>
            </Box>
            <Box paddingBottom={2}> 
            <Field fullWidth
            label="Password" name="password" component={TextField} type="password"/>
            </Box>
            <Box paddingBottom={2}>
            <Field fullWidth
            label="Confirm Password" name="confirmPassword" component={TextField} type="password"/>
            </Box>
          
          <button className="btn btn-dark mt-3" type="submit">Register</button>
          <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          <p className="forgot-password text-right">
                                    Already have an account? <a href="/sign_in">Sign in</a>
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

export default SignUpForm;

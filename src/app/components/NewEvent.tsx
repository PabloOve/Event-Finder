import React from 'react'
import {Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper} from '@material-ui/core'
import {Field, Form, Formik, FormikConfig, FormikValues} from 'formik'
import {CheckboxWithLabel, TextField} from 'formik-material-ui'
import {mixed, number, object} from 'yup';

const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc, time));

export default function NewEvent() {
    return(
            <Card>
                <CardContent>
                    <FormikStepper
                    initialValues={{
                        title: '',
                        description: '',
                        closedSpace: false,
                        concurrency:0,
                        address: ''
                    }}
                    onSubmit={async (values) => {
                        await sleep(3000);
                        console.log('values', values);
                      }}
                    >

                    <FormikStep label ="Event description">
                    <Box paddingBottom={2}>
                    <Field fullWidth
                    name= "title" component={TextField} label="Event Title"/>
                    </Box>
                    <Box paddingBottom={2}>
                    <Field fullWidth
                    name= "description" component={TextField} label="Description"/>
                    </Box>
                    <Box paddingBottom={2}>
                    <Field 
                    name= "closedSpace" type="checkbox" component={CheckboxWithLabel} Label={{ label: 'Closed space'}}/>
                    </Box>
                    </FormikStep>

                    <FormikStep label="Event data"
                                     validationSchema={object({
                                        concurrency: mixed().when('closedSpace', {
                                            is:true,
                                            then: number().required().max(50, 'there cannot be more than 50 in a closed space due to covid 19 restrictions'),
                                            otherwise: number().required()
                                        })
                                    })}
                    >    
                    <Box paddingBottom={2}>
                    <Field fullWidth
                    name= "concurrency" type="number" component={TextField} label="Concurrency"/>
                    </Box>
                    <Box paddingBottom={2}>
                    <Field fullWidth
                    name= "address" component={TextField} label="Event Address"/>
                    </Box>
                    </FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
    )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'>{
    label: string;
}

export function FormikStep({children}: FormikStepProps){
    return <>{children}</>
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>){
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] =  React.useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;

    function isLastStep(){
        return step === childrenArray.length - 1;
    }

    return(
        <Formik {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values,helpers) => {
                if(isLastStep()){
                    await props.onSubmit(values, helpers);
                }else{
                    setStep(s => s+1)
                }
            }}
        >
              {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
                {currentChild}
                <Grid container spacing={2}>
                {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
                 
                 <Grid item>
                 <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
              </Grid>
              </Grid>
            </Form>
              )}
        </Formik>
    );
}

    
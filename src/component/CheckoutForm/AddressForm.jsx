import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
// import FormInput from './CustomTextField';

console.log(InputLabel);
console.log(Select);
console.log(MenuItem);
console.log(Button);
const AddressForm = () => {
    const methods = useForm();
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <input name="firstName" />
                        <input name="firstName" />
                        <input name="firstName" />
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm

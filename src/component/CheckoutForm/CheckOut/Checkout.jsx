import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@mui/material';
import { commerce } from '../../../lib/commerce';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const history = useNavigate()
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                setCheckoutToken(token);
            } catch (error) {
                history.pushState('/');
            }
        }
        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prev) => prev + 1);
    const backStep = () => setActiveStep((prev) => prev - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    const timeOut = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant='outlined' type='button'><Link to='/' style={{ textDecoration: 'none' }} >Back To Home</Link></Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase.</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button variant='outlined' type='button'><Link to='/' style={{ textDecoration: 'none' }} >Back To Home</Link></Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div >
    );

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeOut={timeOut} />

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout

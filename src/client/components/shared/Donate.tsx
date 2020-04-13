import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_7wMjUsZfyNHQrwnOK5vcLElH00ToTNKss3');

const Donate: React.FC<DonateProps> = props => {

    return (
        <>
            <h1 className="text-center my-4">Donate!</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
}

interface DonateProps { }

export default Donate;
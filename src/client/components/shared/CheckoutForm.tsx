import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm: React.FC<FormProps> = props => {

    const history = useHistory();

    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [processing, setProcessing] = useState(false);
    const elements = useElements();
    const stripe = useStripe();

    const chargeCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProcessing(true);
        let cardElement = elements.getElement(CardElement);
        let amt = parseInt(amount);
        try {
            let { token: { id } } = await stripe.createToken(cardElement, { name });
            // send post request with token
            await fetch('/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token: id, amount: amt })
            });
            // sends user back to all blogs page
            history.push({
                pathname: '/',
                state: { confirmation: `Thanks for your donation, ${name}!`}
            });
        } catch (e) {
            setProcessing(false);
            throw e;
        }

    }

    return (
        <main className="container">
            <section className="row justify-content-center my-2">
                <div className="col-md-8">
                    <form className="form-group p-3 border rounded shadow">
                        <div className="row">
                            <div className="col-6">
                                <label>Name</label>
                                <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control my-1" required />
                            </div>
                            <div className="col-6">
                                <label>Amount</label>
                                <input onChange={e => setAmount(e.target.value)} value={amount} type="text" className="form-control my-1" required />
                            </div>
                        </div>
                        {/* <CardElement className="form-control my-1" options={CARD_ELEMENT_OPTIONS} /> */}
                        <CardElement className="form-control my-1" />
                        <button
                            onClick={chargeCard}
                            disabled={processing}
                            className="btn btn-primary btn-block w-75 mx-auto shadow mt-3">{processing ? 'Processing...' : 'Submit Donation'}</button>
                    </form>
                </div>
            </section>
        </main>
    );
}


interface FormProps { }

export default CheckoutForm;

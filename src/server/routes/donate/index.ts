import * as express from 'express';
import Stripe from 'stripe';

const router = express.Router();


const stripe = new Stripe('sk_test_EtTySaMNpFDHo6UqgA5nbOKM00x1yRjY6v', {
    apiVersion: "2020-03-02",
    typescript: true
  });

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Statement Description'
    });
}

router.post('/', async (req, res, next) => {
    try {
        let data = await charge(req.body.token, req.body.amount);
        console.log(data);
        res.send('Charged!');
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

export default router;
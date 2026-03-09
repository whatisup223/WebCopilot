const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { planId, userId } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: planId || 'price_1MockId', // يجب تغييره بمعرف الخطة الحقيقي
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?success=true`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing?canceled=true`,
            metadata: {
                userId: userId || 'mock_user_id',
            }
        });

        res.json({ success: true, url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, error: 'حدث خطأ أثناء الاتصال ببوابة الدفع' });
    }
};

const handleWebhook = async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        console.log(`User ${userId} upgraded! (Webhook Success)`);
        // سيتم ربطها بقاعدة البيانات لاحقاً
    }

    res.json({ received: true });
};

module.exports = {
    createCheckoutSession,
    handleWebhook
};

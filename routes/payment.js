const express = require("express")
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items:[ {price_data : {
          currency: "usd",
          product_data: {
            name: req.body.name
          },
          unit_amount: req.body.price *100,
        },quantity : 1}],
  
        success_url: `https://www.rabbitmart.com/`,
        cancel_url: `https://www.rabbitmart.com/`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

  module.exports = router;
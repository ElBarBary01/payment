require("dotenv").config()
const payment = require("./routes/payment.js")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
app.use("/api/payment",payment)

app.post("/create-checkout-session", async (req, res) => {
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

      success_url: `https://rabbit-mart.vercel.app/`,
      cancel_url: `https://rabbit-mart.vercel.app/`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

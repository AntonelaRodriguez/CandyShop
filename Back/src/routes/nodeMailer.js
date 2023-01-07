const { Router } = require('express')
const nodeMailer = require('nodemailer')
const subscribeRouter = Router()

subscribeRouter.post('/', async (req, res, next) => {
	const { email } = req.body
	const transporter = nodeMailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'gerald.schaden69@ethereal.email',
			pass: '9PWEPmz1VeV2ujvSSW'
		}
	});

	var mailOptions = {
		from: "CandyShop",
		to: email,
		subject: "New Subscription",
		text: "You have subscribed to the Candyshop Newsletter"
	}
	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			res.status(500).send(error.message)
		} else {
			console.log("Email sent")
			res.status(200).json(email)
		}
	})
})


module.exports = subscribeRouter
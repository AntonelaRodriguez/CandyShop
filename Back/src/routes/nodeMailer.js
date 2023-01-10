const { Router } = require('express')
const nodeMailer = require('nodemailer')
const subscribeRouter = Router()

subscribeRouter.post('/:email', async (req, res, next) => {
	const { email } = req.params
	try {
		const transporter = nodeMailer.createTransport({
			service: 'hotmail',
			port: 587,
			auth: {
				user: 'candyshop127@outlook.com',
				pass: 'Palabra3'
			}
		});

		// transporter.verify(function (error, success) {
		// 	if (error) {
		// 	  console.log(error);
		// 	} else {
		// 	  console.log("Server is ready to take our messages");
		// 	}
		//   });
	
		var mailOptions = {
			from: 'candyshop127@outlook.com',
			to: email,
			subject: "New Subscription",
			text: "<b>You have subscribed to the Candyshop Newsletter</b>"
		}
		transporter.sendMail(mailOptions, (error, info) => {
			if(error) {
				throw new Error(error)
			} else {
				res.status(200).json('Sent' + info.response)
			}
		})
	} catch (error) {
		next(error)
	}
})


module.exports = subscribeRouter
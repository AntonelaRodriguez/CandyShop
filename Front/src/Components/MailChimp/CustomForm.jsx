import React, {useState} from "react";
// import './mcFormStyles.scss'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Button, Heading, Input } from "@chakra-ui/react";


const CustomForm = ({ status, message, onValidated }) => {
	const [ email, setEmail ] = useState('')
	const handleSubmit = (e) => {
		e.preventDefault();

	}
	return(
		<form onSubmit={() =>handleSubmit()}>
			<Heading>Join our email list for future updates.</Heading>
			<Input label='email'
			type='text'
			value={email}
			isRequired/>
			<Button type="submit">Subscribe</Button>
		</form>
	)
}

export default CustomForm;
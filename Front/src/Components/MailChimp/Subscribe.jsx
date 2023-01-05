import React from "react";
// import './mcFromStyles.scss'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from "./CustomForm";

const MailchimpFormContainer = props => {

	const postUrl = ``

	return (
		<div className="mc_form-container">
			<MailchimpSubscribe
			url={postUrl}
			render={({ subscribe, status, message }) => (
						<CustomForm
							status={status} 
							message={message}
							onValidated={formData => subscribe(formData)}
						/>
					)}
				/>
		</div>
	)
}

export default MailchimpFormContainer;
const url = `https://gmail.us11.list-manage.com/subscribe/post?u=6d5d7b1beb610a5a492839003&id=f4e06a0a98`
//url: "https://gmail.us11.list-manage.com/subscribe/post?u=6d5d7b1beb610a5a492839003&amp;id=f4e06a0a98&amp;f_id=00ed89e0f0"
//u: "6d5d7b1beb610a5a492839003"
//id: "f4e06a0a98"
//for : "mce-EMAIL"
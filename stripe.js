import {fetch} from 'wix-fetch';
import {getAPIKey} from 'backend/secrets.jsw';

export async function stripeToken(cardObject, apiKeyPk) {

    let values = encodeCard(cardObject);
    let apiKey = await getAPIKey(apiKeyPk);

	const response = await fetch("https://api.stripe.com/v1/tokens", {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer " + apiKey
		},
		body: values
	});

    if (response.status >= 200 && response.status < 300) {
	    const json = await response.json();
	    return json;
    }
    const json = await response.json();
    let sendBack = {
        message: json.error.message,
        statusCode: json.error.type
    };
    return sendBack;
}

function encodeCard(cardObject) {
	let encoded = "";
	for (let [k, v] of Object.entries(cardObject)) {
		encoded = encoded.concat("card[", k, "]=", encodeURI(v), "&");
	}
	return encoded.substr(0, encoded.length - 1);
}

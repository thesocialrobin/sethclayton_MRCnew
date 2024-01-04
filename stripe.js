//stripe.js

import {fetch} from 'wix-fetch';
import wixSecretsBackend from 'wix-secrets-backend';


export async function stripeToken(cardObject) {

    //const mySecret = await getSecret("myApiKeyName");

    let values = encodeCard(cardObject);

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

export function getAPIKey(apiKeyType) {
  return wixSecretsBackend.getSecret(apiKeyType)
    .then((secret) => {
      return secret
    })
    .catch((error) => {
      console.error(error);
      return error
    });
}

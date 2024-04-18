//Google API Manual Editor X

https://forum.wixstudio.com/t/input-field-address-autocomplete-with-google-maps-in-editor-x/47362


API Key for Seth - Wix - MRC New

let key = "AIzaSyD9ENfwLIhn2QKRaLYDvqbIPanA6DZlRgw";


let address =
  {
    "formatted":"500 Terry A Francois Blvd, San Francisco, CA 94158, USA",
    "location": {
      "latitude": 37.7703718,
      "longitude": -122.38712479999998
      },
      "streetAddress": {
        "name":  "Terry A Francois Blvd",
        "number": "500"
      },
      "city": "SF",
      "subdivision": "CA",
      "country": "US",
      "postalCode": "94158"
  }


//Google Sheets API Authorization

//config.jsw

Added in 

Code for generating manual tokens getAuthUrl Step #1 and Step#2

/* Code for generating manual tokens for Google Sheets Step #1
  getAuthUrl().then((url) => {
			$w("#getCode").link = url;
			$w("#getCode").enable();
		}).catch(console.log);
    //--page update 082823--//
 
 */


 
export function button8_click(event) {

// Code for Generating Manual Analytics tokens Step #2 // Do not delete


let offlineCode = ($w('#input10').value).toString(); // Create input field



generateTokens(offlineCode).then((result) => {
				console.log("Results:", result);
			})
			.catch(error => {
				console.log("Result Error:", error);
			});

}

//--End Google Sheets API Authentication Required for Oauth2 Setup--//


// ID's for Testing $1 Pricing for Essential Plans

DEV API ID Essentials Monthly $1
price_1P74jJGjvTpCU0nDiLc7pCbE

Live API ID Essentials Monthly
price_1P0wRfGjvTpCU0nDCXKnhgnV


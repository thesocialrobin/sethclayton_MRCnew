import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { currentMember } from 'wix-members'

$w.onReady(async function () {

    var agentEmail = await wixUsers.currentUser.getEmail()
    console.log(agentEmail);
    let superAdmin = "seth@resourcemedicare.com";

    if (agentEmail == superAdmin) {
        $w("#agencyPlatform").show();
    } else {
        wixData.query("Team")
            .eq("email", agentEmail)
            .find()
            .then((results) => {
                if (results.items.length > 0) {
                    // Check if the 'agency' field is true
                    if (results.items[0].agencyPlatform) {
                        $w("#agencyPlatform").show();
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

import { authentication } from 'wix-members-frontend';

$w.onReady(function () {
    currentMember.getMember()
        .then((member) => {
            const intercomEmail = member.loginEmail;
            console.log("Member Found for Intercom");

            wixData.query("Team")
                .eq("email", intercomEmail)
                .find()
                .then((results) => {
                    if (results.items.length > 0) {
                        let item = results.items[0];
                        let username = item.name;
                        let userid = item._id;
                        let useremail = item.email;
                        let usercreated_at = Math.floor(item._createdDate.getTime() / 1000);

                        setTimeout(() => {
                            $w('#portal').postMessage({ username, userid, useremail, usercreated_at });
                        }, 5000); // Delay of 5000 milliseconds (5 seconds)
                    }
                });
        });

    authentication.onLogout(() => {
        $w('#portal').postMessage({ action: 'logout' });
    });
});

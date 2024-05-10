import { ok, badRequest, created, serverError } from 'wix-http-functions';
import { fetch } from 'wix-fetch'
import wixData from 'wix-data';
import { newAttendee } from "backend/email";
import { mediaManager } from 'wix-media-backend';

var myHeaders = {}
myHeaders["Authorization"] = "Bearer ZKZM2G3NNEZTBYVYDLY3"
myHeaders["Content-Type"] = "application/json"

export async function post_sendAgentOrderEmail(request) {

    var obj = await request.body.json()

    console.log(obj);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    return fetch(obj.api_url, requestOptions)
        .then(async (response) => {
            var obj2 = await response.json()
            console.log(obj2);
            console.log(obj2.event_id)
            return wixData.query('Events').eq('eventbriteId', obj2.event_id).find().then((res) => {
                var item = res.items[0]
                var agentId = item.agentId
                console.log(agentId);

                var toSend = {
                    attendeeName: obj2.name,
                    attendeeEmail: obj2.email,
                    eventName: item.eventName,
                    eventDate: item.date.toLocaleDateString()
                }
                var toInsert = {
                    attendeeName: obj2.name,
                    attendeeEmail: obj2.email,
                    eventbriteId: obj2.event_id
                }

                return wixData.insert('EventAttendees', toInsert).then(() => {
                    console.log('inserted');
                    return newAttendee(agentId, toSend).then((res) => {
                        console.log(res);
                        return ok()
                    }).catch((err) => {
                        console.log(err);
                    })

                })

            })
        })
        .catch((error) => {
            console.log(error);
            return ok();
        });
}

export function post_excelFile(request) {
 let options = {
 "suppressAuth": true,
 "headers": {
 "Content-Type": "application/json"
        }
    };
 // get the request body
    return request.body.json()
    .then((body) => {
        return importFile(body["_id"], body["url"]);
    })
    .then((results) => {
        options.body = {
 "inserted": results
        };
        return created(options);
    })
 // something went wrong
    .catch((error) => {
        options.body = {
 "error": error
        };
        return serverError(options);
    });
}

async function importFile(_id, url) {
   let fileName = _id + '.xls';
  return mediaManager.importFile(
    "/postcard",
    url,
    {
      "metadataOptions": {
        "isPrivate": false,
        "isVisitorUpload": true,
        "fileName": fileName,
        "context": {
          "someKey1": "someValue1",
          "someKey2": "someValue2"
        }
      }
    }
  );
}

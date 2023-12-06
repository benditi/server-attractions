const { rejects } = require("assert");
const { error } = require("console");

function callAndCancel(url, maxTime) {
  let response = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Took to many time");
    }, maxTime);
    let res = fetch("https://data.gov.il/api/3/action/datastore_search", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        response
          .json()
          .then((data) => resolve(data))
          .catch((err) => {
            reject("status", response.status);
          })
      )
      .catch((error) => {
        reject("error", error);
      });
  });
  return response;
}

callAndCancel("");

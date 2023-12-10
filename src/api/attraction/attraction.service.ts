import database from "../../services/database.service";
import secondPath from "path";
const datePath = secondPath.join(
  __dirname,
  "../..",
  "data",
  "attraction-date.json"
);

export async function seedAttractions() {
  try {
    console.log("inside seedAttractions");
    let data = {
      resource_id: "967a8a23-c08c-4c47-b39d-ce350537821b", // the resource id
      limit: 40, // get 40 results
    };
    let response = await fetch(
      "https://data.gov.il/api/3/action/datastore_search",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    let responseData = await response.json();
    let attractions = responseData.result.records;
    database.changeAllItems(attractions);
  } catch (err) {
    console.log("Cannot get attractions", err);
  }
}

export async function callSeedAttraction() {
  let date = database.readDatabase(datePath);
  console.log("datePath", datePath);

  console.log("date", date);
  if (!date || !date.length) {
    console.log("inside (new Date()).getDate()", new Date().getDate());
    database.writeDatabase({ date: 10 }, datePath);
  }
}

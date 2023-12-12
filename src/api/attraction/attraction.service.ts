import database from "../../services/database.service";
import secondPath from "path";
import { getTodaysDate } from "../../services/utils.service";
const datePath = secondPath.join(
  __dirname,
  "../..",
  "data",
  "attraction-date.json"
);

export async function seedAttractions() {
  try {
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
  let data = database.readDatabase(datePath);
  let todayDate = getTodaysDate();
  if (!data || !data.date) {
    await seedAttractions();
    database.writeDatabase({ date: todayDate }, datePath);
    return;
  }
  if (data.date === todayDate) {
    return;
  }
  await seedAttractions();
  database.writeDatabase({ date: todayDate }, datePath);
}

export function callFunctionInterval(func: () => void, milliseconds:number) {
  let intervalId = setInterval(func, milliseconds);
  return intervalId;
}

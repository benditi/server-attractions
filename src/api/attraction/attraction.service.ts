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
  let data = database.readDatabase(datePath);
  let todayDate = getTodaysDate();
  console.log("todayDate", todayDate);
  if (!data || !data.date) {
    console.log("inside first");
    await seedAttractions()
    database.writeDatabase({ date: todayDate }, datePath);
    return
  }
  if (data.date===todayDate){
    console.log("inside same day");
    return
  }
    await seedAttractions()
    database.writeDatabase({ date: todayDate }, datePath);
}

export function callFunctionEveryMinute(func:()=>void){
  let intervalId = setInterval(func, 1000*10)
}
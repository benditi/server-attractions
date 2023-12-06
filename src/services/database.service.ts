import secondFs from "fs";
import secondPath from "path";
const databasePath = secondPath.join(__dirname, "..", "data", "database.json");

function readDatabase() {
  try {
    const data = secondFs.readFileSync(databasePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeDatabase(data:any) {
  secondFs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
}

export default {
  getAllItems: () => readDatabase(),
  changeAllItems: (item:any) => {
    writeDatabase(item);
  },
};

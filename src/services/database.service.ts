import secondFs from "fs";
import secondPath from "path";
const databasePath = secondPath.join(__dirname, "..", "data", "database.json");

function readDatabase(fileName: string) {
  try {
    const data = secondFs.readFileSync(fileName, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeDatabase(data: any, fileName: string) {
  try {
    secondFs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("error", err);
  }
}

export default {
  getAllItems: () => readDatabase(databasePath),
  changeAllItems: (item: any) => {
    writeDatabase(item, databasePath);
  },
  readDatabase,
  writeDatabase,
};

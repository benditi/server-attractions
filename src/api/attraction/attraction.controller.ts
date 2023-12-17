import database from "../../services/database.service";

export async function getAttractions(req: any, res: any) {
  try {
    let attractions = database.getAllItems();
    // await attractionService.remove(req.params.id)
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.status(200).send({ attractions });
  } catch (err) {
    console.log("Failed to delete attraction", err);
    res.status(500).send({ err: "Failed to delete attraction" });
  }
}

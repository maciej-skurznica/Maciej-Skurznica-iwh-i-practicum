const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = "pat-eu1-aee2ceeb-97e3-4384-8989-a0485c2b8082";
const headers = {
  Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
  "Content-Type": "application/json",
};

app.get("/", async (req, res) => {
  const url =
    "https://api.hubspot.com/crm/v3/objects/pets?properties=name,age,type";

  try {
    const { data } = await axios.get(url, { headers });
    res.render("index", {
      title: "Pets | Integrating With HubSpot I Practicum",
      results: data.results,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/update-cobj", (req, res) => {
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  });
});

app.post("/update-cobj", async (req, res) => {
  const url = "https://api.hubspot.com/crm/v3/objects/pets";
  const body = {
    properties: {
      name: req.body.name,
      age: req.body.age,
      type: req.body.type,
    },
  };

  try {
    await axios.post(url, body, { headers });
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));

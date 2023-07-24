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
  const pets =
    "https://api.hubspot.com/crm/v3/objects/pets?properties=name,age,type";

  try {
    const response = await axios.get(pets, { headers });
    const data = response.data.results;
    res.render("index", { title: "Pets - custom object", data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/update-cobj", (req, res) => {
  res.render("update-cobj", { title: "Form - custom object" });
});

// app.post("/update-cobj", async (req, res) => {
//   const update = {
//     properties: {
//       favorite_book: req.body.newVal,
//     },
//   };

//   const email = req.query.email;
//   const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
//   const headers = {
//     Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
//     "Content-Type": "application/json",
//   };

//   try {
//     await axios.patch(updateContact, update, { headers });
//     res.redirect("back");
//   } catch (err) {
//     console.error(err);
//   }
// });

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));

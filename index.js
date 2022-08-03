const express = require("express");
const supabase = require("./route/supabase");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get data admin
app.get("/admin", async (req, res) => {
  const { data } = await supabase.from("saran").select("*");
  res.status(200).json(data);
});

//get data news
app.get("/news", async (req, res) => {
  const { data } = await supabase.from("news").select("*");
  res.status(200).json(data);
});

//post data news
app.post("/news", async (req, res) => {
  const { error } = await supabase
    .from("news")
    .insert({ judul: req.body.judul, deskripsi: req.body.deskripsi });
  console.dir(req.body);
  res.status(200).json(error);
});

// app.get("/users/:kontol", async (req, res) => {
//   const { data } = await supabase
//     .from("User")
//     .select("*")
//     .match({ nama_user: req.params.kontol });

//   res.status(200).json(data);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

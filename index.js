const express = require("express");
const supabase = require("./route/supabase");
const app = express();
const port = 3000;

app.get("/admin", async (req, res) => {
  const { data } = await supabase.from("saran").select("*");
  res.status(200).json(data);
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

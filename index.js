const express = require("express");
const supabase = require("./route/supabase");
const app = express();
const port = process.env.PORT || 2022;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get data admin
app.get("/admin", async (req, res) => {
  const { data } = await supabase.from("admin").select("*");
  res.status(200).json(data);
});

// get data user
app.get("/user", async (req, res) => {
  const { data } = await supabase.from("user").select("*");
  res.status(200).json(data);
});

// get data jadwal_booking
app.get("/jadwal", async (req, res) => {
  const { data } = await supabase.from("jadwal_booking").select("*");
  res.status(200).json(data);
});

// // get data layanan
// app.get("/layanan", async (req, res) => {
//   const { data } = await supabase.from("layanan").select("*");
//   res.status(200).json(data);
// });

//get data news
app.get("/news", async (req, res) => {
  const { data } = await supabase.from("news").select("*");
  res.status(200).json(data);
});

// get data notifikasi
app.get("/notif", async (req, res) => {
  const { data } = await supabase.from("notifikasi").select("*");
  res.status(200).json(data);
});

// get data opsi
app.get("/opsi", async (req, res) => {
  const { data } = await supabase.from("opsi").select("*");
  res.status(200).json(data);
});

// get data promo
app.get("/promo", async (req, res) => {
  const { data } = await supabase.from("promo").select("*");
  res.status(200).json(data);
});

// get data kategori
app.get("/kategori", async (req, res) => {
  const { data } = await supabase.from("kategori").select("*");
  res.status(200).json(data);
});

// // get data transaksi
// app.get("/transaksi", async (req, res) => {
//   const { data } = await supabase.from("transaksi").select("*");
//   res.status(200).json(data);
// });

app.get("/layanan", async (req, res) => {
  const { data, error } = await supabase.from("layanan").select(`
    id_layanan, nama_layanan, deskripsi_layanan, harga, detail_layanan,
    kategori (
      id_kategori,
      nama_kategori,
      icon,
      color,
      bg_color
    )
  `);
  res.status(200).json(data);
});

app.get("/transaksi", async (req, res) => {
  const { data, error } = await supabase.from("transaksi").select(`
    id_transaksi, tgl_masuk, tgl_keluar, kendaraan, status, total_harga,
    user:id_user (id_user), 
    layanan:id_layanan (id_layanan, nama_layanan, deskripsi_layanan, harga, detail_layanan),
    kategori:id_kategori (id_kategori, nama_kategori, icon, color, bg_color)
  `);
  res.status(200).json(data);
});

//post data news
app.post("/news", async (req, res) => {
  const { error } = await supabase.from("news").insert({
    judul: req.body.judul,
    deskripsi: req.body.deskripsi,
    gambar: req.body.gambar,
    tanggal: req.body.tanggal,
  });
  console.dir(req.body);
  res.status(200).json(error);
});

app.post("/signup", async (req, res) => {
  const { user, session, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    res.status(200).json(error);
  } else {
    res.status(200).json(user);
  }
});

//hiuiu
app.post("/signin", async (req, res) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    res.status(200).json(error);
  } else {
    res.status(200).json(session);
  }
});

// get data signin
app.get("/signin", async (req, res) => {
  const { data } = await supabase.auth.signIn;
  res.status(200).json(data);
});

app.post("/refreshtoken", async (req, res) => {
  const { user, session, error } = await supabase.auth.signIn({
    refreshToken: req.body.refreshtoken,
  });

  if (error) {
    res.status(200).json(error);
  } else {
    res.status(200).json(session);
  }
});

app.post("/transaksi", async (req, res) => {
  const { error } = await supabase.from("transaksi").insert({
    id_user: req.body.id_user,
    id_layanan: req.body.id_layanan,
    id_kategori: req.body.id_kategori,
    tgl_masuk: req.body.tgl_masuk,
    tgl_keluar: req.body.tgl_keluar,
    kendaraan: req.body.kendaraan,
    status: "Proses pencucian",
    total_harga: req.body.total_harga,
  });
  console.dir(req.body);
  res.status(200).json(error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

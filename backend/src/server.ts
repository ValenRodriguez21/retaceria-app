import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.get("/productos", (req, res) => {
  res.json([
    {
      id: 1,
      codigo: "A102",
      nombre: "Jean Azul",
      precio: 5000,
      stock: 20
    }
  ]);
});


app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
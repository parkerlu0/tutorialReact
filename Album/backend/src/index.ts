import express, { Request, Response } from "express";
import mysql, { Connection, MysqlError } from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/albums", (req: Request, res: Response) => {
  const q = "SELECT * FROM albums";
  db.query(q, (err: MysqlError | null, data?: any) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/albums", (req: Request, res: Response) => {
  const q = "INSERT INTO albums(`title`, `artist`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.artist,
    req.body.cover,
  ];

  db.query(q, [values], (err: MysqlError | null, data?: any) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/albums/:id", (req: Request, res: Response) => {
  const albumId = req.params.id;
  const q = " DELETE FROM albums WHERE id = ? ";

  db.query(q, [albumId], (err: MysqlError | null, data?: any) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/albums/:id", (req: Request, res: Response) => {
  const albumId = req.params.id;
  const q = "UPDATE albums SET `title`= ?, `artist`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.artist,
    req.body.cover,
  ];

  db.query(q, [...values, albumId], (err: MysqlError | null, data?: any) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected");
});

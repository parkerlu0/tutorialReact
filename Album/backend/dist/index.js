"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const db = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test",
});
app.get("/albums", (req, res) => {
    const q = "SELECT * FROM albums";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});
app.post("/albums", (req, res) => {
    const q = "INSERT INTO albums(`title`, `artist`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.artist,
        req.body.cover,
    ];
    db.query(q, [values], (err, data) => {
        if (err)
            return res.send(err);
        return res.json(data);
    });
});
app.delete("/albums/:id", (req, res) => {
    const albumId = req.params.id;
    const q = " DELETE FROM albums WHERE id = ? ";
    db.query(q, [albumId], (err, data) => {
        if (err)
            return res.send(err);
        return res.json(data);
    });
});
app.put("/albums/:id", (req, res) => {
    const albumId = req.params.id;
    const q = "UPDATE albums SET `title`= ?, `artist`= ?, `cover`= ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.artist,
        req.body.cover,
    ];
    db.query(q, [...values, albumId], (err, data) => {
        if (err)
            return res.send(err);
        return res.json(data);
    });
});
app.listen(8800, () => {
    console.log("Connected");
});

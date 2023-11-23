import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Album {
  title: string;
  artist: string;
  cover: string;
}

const Add: React.FC = () => {
  const [album, setAlbum] = useState<Album>({
    title: "",
    artist: "",
    cover: "",
  });
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAlbum((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/albums", album);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>アルバムを追加</h1>
      <input
        type="text"
        placeholder="タイトル"
        name="title"
        onChange={handleChange}
      />
      <textarea
        placeholder="アーティスト"
        name="artist"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="ジャケット画像"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && <p>追加できません</p>}
      <Link to="/">アルバム一覧</Link>
    </div>
  );
};

export default Add;

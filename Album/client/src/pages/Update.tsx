import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Album {
  title: string;
  artist: string;
  cover: string;
}

const Update: React.FC = () => {
  const [album, setAlbum] = useState<Album>({
    title: "",
    artist: "",
    cover: "",
  });
  const [error, setError] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const albumId = location.pathname.split("/")[2];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbum((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/albums/${albumId}`, album);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>更新</h1>
      <input
        type="text"
        placeholder="タイトル"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
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
      <button onClick={handleClick}>Update</button>
      {error && <p>更新できません</p>}
      <Link to="/">アルバム一覧</Link>
    </div>
  );
};

export default Update;

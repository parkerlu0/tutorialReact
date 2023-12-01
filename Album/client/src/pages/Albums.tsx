import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAllAlbums = async () => {
      try {
        const res = await axios.get<Album[]>("http://localhost:8800/albums");
        setAlbums(res.data);
        setFilteredAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAlbums();
  }, []);

  useEffect(() => {
    const filtered = albums.filter((album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAlbums(filtered);
  }, [searchQuery, albums]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8800/albums/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>アルバムコレクション</h1>
      <input className="search"
        type="text"
        placeholder="アルバムを検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="albums">
        {filteredAlbums.map((album) => (
          <div key={album.id} className="album">
            <img src={album.cover} alt="" />
            <h2>{album.title}</h2>
            <p>{album.artist}</p>
            <button className="delete" onClick={() => handleDelete(album.id)}>
              削除
            </button>
            <button className="update">
              <Link
                to={`/update/${album.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                更新
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          追加
        </Link>
      </button>
    </div>
  );
};

export default Albums;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Home = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchItem}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        navigate("/");
        setLoading(false);
      });
  }, [searchItem]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const eventValue = event.target.search.value;
    setSearchItem(eventValue);
  };

  let contain;
  if (loading) {
    contain = <Loader />;
  } else {
    contain = (
      <>
        <div>
          <div className="item-section">
            <div className="grid gap-4 grid-cols-3 grid-rows">
              {result.name ? (
                <div className="card bg-slate-100 rounded-md p-5 shadow-lg text-center">
                  {/* <img src={result.sprites.back_default} alt="" /> */}
                  <h1 className="font-bold">Name: {result.name}</h1>
                  <p>Height: {result.height}</p>
                  <p>Weight: {result.weight}</p>
                </div>
              ) : null}
            </div>
            {!result.name ? (
              <div className="errorcheaker">
                <h1>Data not Found</h1>
                <h3>please Search First</h3>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="search-box">
        <form onSubmit={(event) => onSubmitHandler(event)}>
          <input
            className="search-input px-10 py-3 rounded-md"
            type="search"
            name="search"
            id=""
            placeholder="search your item name"
          />
          <input
            className="search-btn ml-3 px-5 py-3 rounded-md"
            type="submit"
            value="Search"
          />
        </form>
      </div>
      <hr className="hr-style my-5" />

      {contain}
    </div>
  );
};

export default Home;

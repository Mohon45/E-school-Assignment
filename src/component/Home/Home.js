import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Home = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setResult(data.results);
        setLoading(false);
      });
  }, [searchItem]);

  const onChangeHandler = (event) => {
    const eventValue = event.target.value;

    const newData = result.filter((data) =>
      data.name.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase())
    );
    setSearchItem(newData);
  };

  console.log(searchItem);

  let contain;
  if (loading) {
    contain = <Loader />;
  } else {
    contain = (
      <>
        <div>
          <div className="search-box">
            <form>
              <input
                className="search-input px-10 py-3 rounded-md"
                onChange={(event) => onChangeHandler(event)}
                type="search"
                name="search"
                id=""
                placeholder="search your item name"
              />
            </form>
          </div>
          <hr className="hr-style my-5" />

          <div className="item-section">
            <div className="grid gap-4 grid-cols-3 grid-rows">
              {searchItem.map((item, index) => (
                <div
                  className="card bg-slate-100 rounded-md p-5 shadow-lg"
                  key={index}
                >
                  <h1 className="font-bold">Name: {item.name}</h1>
                  <p>Link: {item.url}</p>
                  <p>There is no more data in this API</p>
                </div>
              ))}
            </div>
            {searchItem.length === 0 ? (
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

  return <div>{contain}</div>;
};

export default Home;

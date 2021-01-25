import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getCoins = async () => {
    await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    ).then((response) => {
      console.log(response);
      setCoins(response.data);
    });
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search for a currency</h1>
        <form>
          <input
            type="search"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

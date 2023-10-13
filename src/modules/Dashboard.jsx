import { useEffect, useState } from "react";
import { db } from "../firebase";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../components/hooks";
import { styled } from "../stitches.config";
import { ALPHAVANTAGE_API_KEYS } from "../App.js";
import { toploss } from "./_mock.js";
const Card = styled("div", {
  bc: "white",
  height: "auto",
  p: "$3 $4",
  borderRadius: 6,
  span: { fontSize: 11, color: "gray" },
});
const DashboardWrap = styled("div", {
  gap: "$3",
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 25px)",
  h1: { fontSize: 24, fontWeight: "bold" },
  ".content": {
    flexDirection: "column",
    p: "$3 $4",
    gap: "$3",
    display: "flex",
    overflow: "auto",
    height: "calc(100% - 36px)",
  },
  ".section-wrap": {
    bc: "#E1F5FE",
    br: 6,
    height: "calc(100% - 224px)",
    p: "$3",
    h3: {
      fontSize: 18,
      fontWeight: "bold",
      mb: 12,
    },
  },
  ".content-card-top-loss": {
    display: "grid",
    gridTemplate: "1fr / 1fr 1fr",
    gap: 12,
    mx: "$4",
    mt: "$4",
    ".name": {
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  ".card-top-loss": {
    bc: "white",
    p: "$4",
    borderRadius: 6,
  },
  ".node": { width: "fit-content", p: "$1", borderRadius: 4 },
  ".red": { bc: "#FF8A80", color: "#D32F2F" },
  ".green": { bc: "#69F0AE", color: "#43A047" },
});
const Signout = styled('button',{
  fontSize: 11, position: 'absolute', bottom: 12, right: 24, color: '#aaa'
})
const Dashboard = ({ setPage, setStockDetail }) => {
  const [user, setSign] = useUser();
  const [selectedStock, setSelectedStock] = useState([]);
  const [gainLoss, setGainLoss] = useState();
  const fetch = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const _res = docSnap.data();
      const res = _res ? _res.stocks : [];
      setSelectedStock(res);
    }
  };
  const fetchTopGainLoss = async () => {
    const apiUrl = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${ALPHAVANTAGE_API_KEYS}`;
    const tg = await axios.get(apiUrl);
    if (
      Object.keys(tg?.data).includes("Information") ||
      Object.keys(tg?.data).includes("Note")
    ) {
      setGainLoss(toploss);
    } else {
      setGainLoss(tg.data);
    }
  };
  useEffect(() => {
    if (user) {
      fetchTopGainLoss();
      fetch();
    }
  }, [user]);
  function seeDetail(stck) {
    setStockDetail(stck);
    setPage("detail");
  }
  function seekTicker(stck) {
    // const client = algoliasearch(ALGOLIA_appId, ALGOLIA_adminKey);
    // const index = client.initIndex("por_dee");
    // index.search(stck).then(({ hits }) => {
    //   // setStocks(hits);
    //   console.log(hits);
    // });
  }
  return (
    <DashboardWrap>
      <div className="flex justify-between">
        <h1>Dashboard</h1>
        <button onClick={() => setPage("search")}>search</button>
      </div>
      {gainLoss?.top_gainers && (
        <div className="section-wrap">
          <div className="flex justify-between">
            <h3>Gainer and Losser</h3>
            <div style={{ color: "#bdbdbd" }}>{gainLoss?.last_updated}</div>
          </div>
          <div className="content-card-top-loss">
            <div
              className="card-top-loss"
              onClick={() => seekTicker(gainLoss?.top_gainers[0])}
            >
              <div className="name">{gainLoss?.top_gainers[0]?.ticker}</div>
              <div>price: {gainLoss?.top_gainers[0].price}</div>
              <div
                className={`${
                  gainLoss?.top_gainers[0].change_amount < 0 ? "red" : "green"
                } node`}
              >
                {`${gainLoss?.top_gainers[0].change_amount}(${gainLoss?.top_gainers[0].change_percentage})`}
              </div>
              <div>volumn:{gainLoss?.top_gainers[0].volume}</div>
            </div>
            <div
              className="card-top-loss"
              onClick={() => seekTicker(gainLoss?.top_losers[0])}
            >
              <div className="name">{gainLoss?.top_losers[0].ticker}</div>
              <div>price: {gainLoss?.top_losers[0].price}</div>
              <div
                className={`${
                  gainLoss?.top_losers[0].change_amount > 0 ? "green" : "red"
                } node`}
              >
                {`${gainLoss?.top_losers[0].change_amount}(${gainLoss?.top_losers[0].change_percentage})`}
              </div>
              <div>volumn: {gainLoss?.top_losers[0].volume}</div>
            </div>
          </div>
        </div>
      )}
      <div className="section-wrap">
        <h3>Your watchlist</h3>
        <div className="content">
          {selectedStock.map((i, ik) => (
            <Card key={ik} onClick={() => seeDetail(i)}>
              <div>
                {`${i.symbol} `}
                <span>{`(${i.name})`}</span>
              </div>
              <div>EXCHANGE:{i.exchange}</div>
            </Card>
          ))}
        </div>
      </div>
      <Signout onClick={()=>setSign(true)}>signout</Signout>
    </DashboardWrap>
  );
};
export default Dashboard;

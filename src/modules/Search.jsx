import React, { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/index.jsx";
import { styled } from "../stitches.config.js";
import algoliasearch from "algoliasearch";
import { useUser } from "../components/hooks.js";
import { Button } from "../components/Button.jsx";
import { ALGOLIA_adminKey, ALGOLIA_appId } from "../App.js";
const Input = styled("input", {
  width: "100%",
  border: "1px solid gray",
  borderRadius: 4,
  my: "$4",
  p: "$2",
});
const SearchWrap = styled("div", {
  p: '$2 $4',
  br: 4,
  bc: "#f5f5f5",
});
const Container = styled("div", {
  height: "calc(100% - 112px)",
  display: "grid",
  gridTemplate: "1fr / 1fr 1fr",
  // flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: 12,
  overflow: "auto",
  ".card": {
    display: "flex",
    gap: 12,
    bc: "white",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid gray",
    borderRadius: 4,
    p: "$3 $6",
    ".name": { fontSize: 11 },
  },
});

function Stocks({ setPage, setStockDetail }) {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState([]);
  const [user] = useUser();

  const fetch = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const _res = docSnap.data();
      const res = _res ? _res.stocks : [];
      setSelectedStock(res);
    }
  };
  React.useEffect(() => {
    // Check existing stock
    if (user) {
      fetch();
    }
  }, [user]);

  React.useEffect(() => {
    // Initiate algolia data
    const client = algoliasearch(ALGOLIA_appId, ALGOLIA_adminKey);
    const index = client.initIndex("por_dee");
    const getData = setTimeout(() => {
      index.search(search).then(({ hits }) => {
        setStocks(hits);
      });
    }, 1000);

    return () => clearTimeout(getData);
  }, [search]);
  async function addStock(stck, e) {
    // add new to stck
    e.stopPropagation();
    if (selectedStock.length > 0) {
      const isExisted = selectedStock.find((i) => stck.symbol == i.symbol);
      const docRef = doc(db, "users", user.uid);
      if (isExisted) {
        const filteredStck = selectedStock.filter(
          (i) => i.symbol !== stck.symbol
        );
        await updateDoc(docRef, {
          stocks: filteredStck,
        });
      } else {
        await updateDoc(docRef, {
          stocks: [...selectedStock, stck],
        });
      }
    } else {
      await setDoc(doc(db, "users", user.uid), {
        phoneNumber: user.phoneNumber,
        stocks: [stck],
      });
    }
    // recall updated data
    fetch();
  }
  function seeDetail(stck) {
    setStockDetail(stck);
    setPage("detail");
  }
  return (
    <SearchWrap className="h-full">
      <div className="flex justify-between">
        <h1>Stocks List</h1>
        <div onClick={() => setPage("dashboard")}>mylist</div>
      </div>
      <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <Container>
        {stocks.map((stock, index) => {
          const isFollowed = selectedStock.find(
            (i) => i.symbol == stock.symbol
          );
          return (
            <div className="card" key={index} onClick={() => seeDetail(stock)}>
              <div className="symbol">{stock.symbol}</div>
              <div className="name">{stock.name}</div>
              <Button
                full
                checked={!!isFollowed}
                onClick={(e) => addStock(stock, e)}
              >
                {isFollowed ? "Followed" : "Follow"}
              </Button>
            </div>
          );
        })}
      </Container>
    </SearchWrap>
  );
}

export default Stocks;

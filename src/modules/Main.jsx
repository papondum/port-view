import React, { useState, createContext } from "react";
import Auth from "../components/Auth";
import Search from "./Search";
import Dashboard from "./Dashboard";
import Detail from "./Detail";
import { useUser } from "../components/hooks";
export const StockContext = createContext();
function Main() {
  const [page, setPage] = useState();
  const [stockDetail, setStockDetail] = useState("");
  const [user] = useUser();
  const pageRoute = {
    dashboard: <Dashboard setPage={setPage} setStockDetail={setStockDetail} />,
    search: <Search setPage={setPage} setStockDetail={setStockDetail} />,
    detail: <Detail setPage={setPage} />,
  };

  return user ? (
    <StockContext.Provider value={stockDetail}>
      <div className="w-full h-full">{pageRoute[page || "dashboard"]}</div>
    </StockContext.Provider>
  ) : (
    <Auth />
  );
}
export default Main;

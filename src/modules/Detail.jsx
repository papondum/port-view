import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useUser } from "../components/hooks.js";
import { db } from "../firebase/index.jsx";
import { styled } from "../stitches.config";
import { StockContext } from "./Main";
import { Line } from "react-chartjs-2";
import { ALPHAVANTAGE_API_KEYS } from "../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "../components/Button";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Card = styled("div", {
  border: "1px solid gray",
  display: "grid",
  gridTemplate: "1fr / 1fr 3fr ",
  gap: 6,
  p: "$3 $6",
  borderRadius: 4,
  ".img": { width: 150, height: "auto", m: "auto" },
  ".title": { fontWeight: "bold" },
  ".summary": {},
});
const Detail = ({ setPage }) => {
  const stckData = useContext(StockContext);
  const [range, setRange] = useState("DAILY");
  const [dayRange, setDayRange] = useState();
  const [feed, setFeed] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);
  const user = useUser();
  const [data, setData] = useState({
    open: [],
    height: [],
    low: [],
    close: [],
    volumn: [],
  });
  useEffect(() => {
    // Check existing stock
    if (user) {
      fetch();
    }
  }, [user]);
  const fetch = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const _res = docSnap.data();
      const res = _res ? _res.stocks : [];
      setSelectedStock(res);
    }
  };

  function _setRange(type, sub) {
    if (sub) {
      setDayRange(sub);
    }
    setRange(type);
  }
  const [labels, setLabels] = useState([]);
  const keyMap = {
    DAILY: "Time Series (Daily)",
    WEEKLY: "Weekly Time Series",
    MONTHLY: "Monthly Time Series",
    INTRADAY: `Time Series (${dayRange})`,
  };
  const isFollowed = selectedStock.find((i) => i.symbol == stckData.symbol);

  async function addStockToUser() {
    const docRef = doc(db, "users", user.uid);
    if (isFollowed) {
      // update remove selected
      const filteredStck = selectedStock.filter(
        (i) => i.symbol !== stckData.symbol
      );
      await updateDoc(docRef, {
        stocks: filteredStck,
      });
    } else {
      // update add new one
      await updateDoc(docRef, {
        stocks: [...selectedStock, stckData],
      });
    }
    fetch();
  }
  useEffect(() => {
    //Fetch on click
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_${range}&symbol=${stckData.symbol}&apikey=${ALPHAVANTAGE_API_KEYS}`;
    if (range == "INTRADAY") {
      url = `https://www.alphavantage.co/query?function=TIME_SERIES_${range}&symbol=${stckData.symbol}&interval=${dayRange}&apikey=${ALPHAVANTAGE_API_KEYS}`;
    }
    const fetch = async () => {
      try {
        const response = await axios.get(url);
        const _res = response.data[keyMap[range]];
        const _labels = [];
        const _open = [];
        const _height = [];
        const _low = [];
        const _close = [];
        const _volumn = [];
        for (let i in _res) {
          _labels.push(i);
          _open.push(_res[i]["1. open"]);
          _height.push(_res[i]["2. height"]);
          _low.push(_res[i]["3. low"]);
          _close.push(_res[i]["4. close"]);
          _volumn.push(_res[i]["5. volumn"]);
        }
        setLabels(_labels);
        setData({
          open: _open,
          height: _height,
          low: _low,
          close: _close,
          volumn: _volumn,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [range]);

  useEffect(() => {
    //Fetch news relate on start
    const apiNews = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${stckData.symbol}&apikey=${ALPHAVANTAGE_API_KEYS}`;
    const fetch = async () => {
      const resp = await axios.get(apiNews);
      resp?.data?.feed && setFeed(resp?.data?.feed);
    };
    fetch();
  }, [stckData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${stckData.symbol} - ${stckData.name}`,
      },
    },
  };

  const _data = {
    labels,
    datasets: [
      {
        label: "Open",
        data: data["open"],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Height",
        data: data["height"],
        borderColor: "#EC407A",
        backgroundColor: "#880E4F",
      },
      {
        label: "Low",
        data: data["low"],
        borderColor: "#7B1FA2",
        backgroundColor: "#BA68C8",
      },
      {
        label: "Close",
        data: data["close"],
        borderColor: "#64B5F6",
        backgroundColor: "#1976D2",
      },
      {
        label: "Volumn",
        data: data["volumn"],
        borderColor: "#00796B",
        backgroundColor: "#4DB6AC",
      },
    ],
  };
  return (
    <div>
      <div onClick={() => setPage("dashboard")}>{"<"} Back</div>
      <div></div>
      <div className="p-3 flex justify-between w-full m-auto">
        <Button
          selected={range == "INTRADAY" && dayRange == "1min"}
          onClick={() => _setRange("INTRADAY", "1min")}
        >
          1min
        </Button>
        <Button
          selected={range == "INTRADAY" && dayRange == "5min"}
          onClick={() => _setRange("INTRADAY", "5min")}
        >
          5min
        </Button>
        <Button
          selected={range == "INTRADAY" && dayRange == "15min"}
          onClick={() => _setRange("INTRADAY", "15min")}
        >
          15min
        </Button>
        <Button
          selected={range == "INTRADAY" && dayRange == "30min"}
          onClick={() => _setRange("INTRADAY", "30min")}
        >
          30min
        </Button>
        <Button
          selected={range == "INTRADAY" && dayRange == "60min"}
          onClick={() => _setRange("INTRADAY", "60min")}
        >
          60min
        </Button>
        <Button selected={range == "DAILY"} onClick={() => setRange("DAILY")}>
          Daily
        </Button>
        <Button selected={range == "WEEKLY"} onClick={() => setRange("WEEKLY")}>
          Weekly
        </Button>
        <Button
          selected={range == "MONTHLY"}
          onClick={() => setRange("MONTHLY")}
        >
          Monthly
        </Button>
      </div>
      <div>
        <Line options={options} data={_data} />
      </div>
      <Button full onClick={addStockToUser}>
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
      <div>News Related</div>
      <div className="flex flex-col gap-2">
        {feed.map((i, ii) => {
          return (
            <Card key={ii}>
              <div className="img">
                <img src={i.banner_image} alt="" />
              </div>
              <div className="content-card">
                <div className="title">{i.title}</div>
                <div className="summary">{i.summary}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Detail;

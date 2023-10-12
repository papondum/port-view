import { globalStyles } from "./stitches.config";
import "./App.css";
import Main from "./modules/Main";
export const ALPHAVANTAGE_API_KEYS = "DN1MUXUV8RB78Z2X";
export const ALGOLIA_appId = "VWBR1N7BAR";
export const ALGOLIA_adminKey = "939a784988445ba3c08fb617e183543d";
function App() {
  globalStyles();
  return (
    <main className="flex h-screen flex-col items-center justify-between p-6">
      <div className="z-10 max-w-5xl h-full flex-1 w-full items-center justify-between font-mono text-sm lg:flex">
        <Main />
      </div>
    </main>
  );
}

export default App;

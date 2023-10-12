import { globalStyles } from "./stitches.config";
import "./App.css";
import Main from "./modules/Main";
import { styled } from './stitches.config'
export const ALPHAVANTAGE_API_KEYS = "DN1MUXUV8RB78Z2X";
export const ALGOLIA_appId = "VWBR1N7BAR";
export const ALGOLIA_adminKey = "939a784988445ba3c08fb617e183543d";

const MainWrap = styled('main',{
  '&:before': {
    content: '',
    width: '100%',
    height: '50%',
    position: 'absolute',
    bc: 'rgb(14 165 233)',
    top: 0
  }
})
function App() {
  globalStyles();
  return (
    <MainWrap className="flex h-screen flex-col items-center justify-between p-6">
      <div className="z-10 max-w-5xl h-full flex-1 w-full items-center justify-between font-mono text-sm lg:flex">
        <Main />
      </div>
    </MainWrap>
  );
}

export default App;

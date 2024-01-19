import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LottoMain from './LottoMain.js';
import Home from './Home.js';
import LottoInsert from './api/LottoInsert.js';
import NumberStatistics from './NumberStatistics.js';
import LottoDrwSearch from './LottoDrwSearch.js';
import LottoPrize from './LottoPrize.js';
import LottoScore from './LottoScore.js';
import LottoRandom from './LottoRandom.js';
import LottoViewByDrwNo from './LottoViewByDrwNo.js';
import LottoRecommend from './LottoRecommend.js';
import LottoViewDrwNo from './LottoViewDrwNo.js';
import LottoEvenOdd from './LottoEvenOdd.js';
import LottoSequenced from './LottoSequenced.js';
import LottoNotEmerged from './LottoNotEmerged.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/" element={<Home />}/>
        <Route exact={true} path="/analysis" element={<LottoMain />}/>
        <Route exact={true} path="/lotto" element={<LottoInsert />}/>
        <Route exact={true} path="/number-statistics" element={<NumberStatistics />}/>
        <Route exact={true} path="/drw-search" element={<LottoDrwSearch />}/>
        <Route exact={true} path="/prize" element={<LottoPrize />}/>
        <Route exact={true} path="/score" element={<LottoScore />}/>
        <Route exact={true} path="/random-pick" element={<LottoRandom />}/>
        <Route exact={true} path="/lotto-info" element={<LottoViewByDrwNo />}/>
        <Route exact={true} path="/recommend" element={<LottoRecommend />}/>
        <Route exact={true} path="/list-drwt-no" element={<LottoViewDrwNo />}/>
        <Route exact={true} path="/even-odd" element={<LottoEvenOdd />}/>
        <Route exact={true} path="/sequened" element={<LottoSequenced />}/>
        <Route exact={true} path="/not-emerged" element={<LottoNotEmerged />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

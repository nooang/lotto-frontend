import axios from "axios"
import { useEffect, useState } from "react"
import PrizeInfoTable from "./PrizeInfoTable"

export default function LottoPrize() {
  const [totSellAmnt, setTotSellAmnt] = useState(0)
  const [drwNo1, setDrwNo1] = useState(0)
  const [firstWinamnt, setFirstWinamnt] = useState(0)
  const [drwNo2, setDrwNo2] = useState(0)
  const [firstAccumamnt, setFirstAccumamnt] = useState(0)
  const [drwNo3, setDrwNo3] = useState(0)
  const [firstPrzwnerCo, setFirstPrzwnerCo] = useState(0)
  const [drwNo4, setDrwNo4] = useState(0)
  const [prizeInfoList, setPrizeInfoList] = useState([])
  const [data, setData] = useState({
    "drwNo": "ASC",
    "totSellamnt": "",
    "firstWinamnt": "",
    "firstAccumamnt": "",
    "firstPrzwnerCo": "",
  })

  useEffect(() => {
    axios.get('/lotto/max-amnt')
    .then((response) => {
      const data =response.data 
      setDrwNo1(data[0].drwNo)
      setTotSellAmnt(data[0].totSellAmnt)
      setDrwNo2(data[1].drwNo)
      setFirstWinamnt(data[1].firstWinamnt)
      setDrwNo3(data[2].drwNo)
      setFirstAccumamnt(data[2].firstAccumamnt)
      setDrwNo4(data[3].drwNo)
      setFirstPrzwnerCo(data[3].firstPrzwnerCo)
    })

    axios.post('/lotto/prize-info', data)
    .then((response) => {
      setPrizeInfoList(response.data)
    })
  }, [])

  function doSort(e) {
    console.log(e.target.innerText)
    if (e.target.id === 'tb_drw_no') {
      if (data.drwNo === 'ASC') {
        setData({
          "drwNo": "DESC",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
      else {
        setData({
          "drwNo": "ASC",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
    }
    else if (e.target.id === 'tb_tot_SellAmnt') {
      if (data.totSellamnt === '' || data.totSellamnt === 'DESC') {
        setData({
          "drwNo": "",
          "totSellamnt": "ASC",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
      else if (data.totSellamnt === 'ASC') {
        setData({
          "drwNo": "",
          "totSellamnt": "DESC",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
    }
    else if (e.target.id === 'tb_first_winamnt') {
      if (data.firstWinamnt === '' || data.firstWinamnt === 'DESC') {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "ASC",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
      else if (data.firstWinamnt === 'ASC') {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "DESC",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "",
        })
      }
    }
    else if (e.target.id === 'tb_first_accumamnt') {
      if (data.firstAccumamnt === '' || data.firstAccumamnt === 'DESC') {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "ASC",
          "firstPrzwnerCo": "",
        })
      }
      else if (data.firstAccumamnt === "ASC") {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "DESC",
          "firstPrzwnerCo": "",
        })
      }
    }
    else if (e.target.id === 'tb_first_przwner_co') {
      if (data.firstPrzwnerCo === '' || data.firstPrzwnerCo === 'DESC') {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "ASC",
        })
      }
      else if (data.firstPrzwnerCo === "ASC") {
        setData({
          "drwNo": "",
          "totSellamnt": "",
          "firstWinamnt": "",
          "firstAccumamnt": "",
          "firstPrzwnerCo": "DESC",
        })
      }
    }

    axios.post('/lotto/prize-info', data)
    .then((response) => {
      setPrizeInfoList(response.data)
    })
  }

  return (
    <div className="App">
      역대 당첨금을 조회하는 페이지 입니다.
      <div>
        <button><a href="/">목록으로</a></button>
      </div>
      <div>
        최대 총 상금액 <br />
        {drwNo1}회: {totSellAmnt.toLocaleString()}원
      </div>
      <div>
        최대 1등 당첨금액 <br />
        {drwNo2}회: {firstWinamnt.toLocaleString()}원
      </div>
      <div>
        최대 1등 총 당첨금액 <br />
        {drwNo3}회: {firstAccumamnt.toLocaleString()}원
      </div>
      <div>
        최다 당첨자 <br />
        {drwNo4}회: {firstPrzwnerCo.toLocaleString()}명
      </div>
      <div className="mg-30">
        <table>
          <thead>
            <tr>
              <th id="tb_drw_no" className="tb-drwNo" onClick={doSort}>회차</th>
              <th id="tb_tot_SellAmnt" className="tb-totSell" onClick={doSort}>총 상금액</th>
              <th id="tb_first_accumamnt" className="tb-firstWin" onClick={doSort}>1등 총 상금액</th>
              <th id="tb_first_winamnt" className="tb-firstAccum" onClick={doSort}>1등 개별 상금액</th>
              <th id="tb_first_przwner_co" className="tb-firstPrzCo" onClick={doSort}>당첨자</th>
            </tr>
          </thead>
          <tbody>
            {prizeInfoList.map((item, key) => (
              <PrizeInfoTable item={item} key={key} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
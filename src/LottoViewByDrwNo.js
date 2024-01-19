import axios from "axios"
import { useEffect, useState } from "react"

export default function() {
  const [num, setNum] = useState(0)
  const [maxRound, setMaxRound] = useState(0)
  const [lottoInfo, setLottoInfo] = useState({})

  useEffect(() => {
    axios.get('/lotto/max-round').then((response) => {
      setMaxRound(response.data)
      setNum(maxRound)

      axios.get(`/lotto/info/${maxRound}`).then((response) => {
        setLottoInfo(response.data)
      })
    })
  }, [maxRound])
  
  function getLottoInfo() {
    if (num !== '' && num > 0 && num < maxRound) {
      axios.get(`/lotto/info/${num}`).then((response) => {
        setLottoInfo(response.data)
      })
    }
  }

  return (
    <div className="App">
      회차를 입력하면 정보를 조회하는 곳입니다.
      <div className="mg-30">
        <input type="number" id="drw-no" onChange={(e) => (setNum(e.target.value))}
              onKeyUp={e => {
                if (e.key === 'Enter') getLottoInfo() 
              }}/>
        <button onClick={getLottoInfo}>검색</button>
      </div>

      <div className="mg-30">
        <div className="mg-10">
          {lottoInfo.drwNo}회차
        </div>
        <div className="mg-10">
          추첨일: {lottoInfo.drwNoDate}
        </div>
        <div className="mg-10">
          <div>당첨 번호</div>
          <div id="win_no_wrap">
            <span className="win_no">{lottoInfo.drwtNo1}</span>
            <span className="win_no">{lottoInfo.drwtNo2}</span>
            <span className="win_no">{lottoInfo.drwtNo3}</span>
            <span className="win_no">{lottoInfo.drwtNo4}</span>
            <span className="win_no">{lottoInfo.drwtNo5}</span>
            <span className="win_no">{lottoInfo.drwtNo6}</span>
            <span className="bnus">+</span>
            <span className="win_no">{lottoInfo.bnusNo}</span>
          </div>
        </div>
        <div>
          <div>총 상금액</div>
          <div className="mg-10">{Number(lottoInfo.totSellamnt).toLocaleString()}원</div>
        </div>
        <div>
          <div>1등 상금액</div>
          <div className="mg-10">{Number(lottoInfo.firstWinamnt).toLocaleString()}원</div>
        </div>
        <div>
          <div>1등 당첨 인원</div>
          <div className="mg-10">{Number(lottoInfo.firstPrzwnerCo).toLocaleString()}명</div>

        </div>
        <div>
          <div>1등 총 상금액</div>
          <div className="mg-10">{lottoInfo.firstAccumamnt === 0 ? (lottoInfo.firstWinamnt * lottoInfo.firstPrzwnerCo).toLocaleString() : Number(lottoInfo.firstAccumamnt).toLocaleString() }원</div>

        </div>
      </div>

      <div className="mg-10">
        <button><a href="/">목록으로</a></button>
      </div>
    </div>
  )
}
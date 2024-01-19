import axios from "axios"
import { useEffect, useState } from "react"
import { calcNoCount } from "./NumberStatistics"

export default function LottoRecommend2() {
  const [maxRound, setMaxRound] = useState(0)
  const [section, setSection] = useState(0)
  const [numberList, setNumberList] = useState(() => {
    const initialList = []

    for (let i = 0; i < 45; i++) {
      initialList.push([`${i+1}번`, 0])
    }
    return initialList
  })
  const [resultSet, setResultSet] = useState([])

  // 최신 회차를 가져온다.
  useEffect(() => {
    axios.get('/lotto/max-round').then((response) => {
      setMaxRound(response.data)
    })
  }, [])

  function doRecommend2() {
    let tempArr = []
    let i = Math.round(maxRound / 50)
    setSection(Math.floor(Math.random() * i) + 1)

    // 6개를 적당히 섞는다.
    if (i - section > 2) {
      axios.get(`/lotto/all-number?drwLowNo=${maxRound - 200}&drwHighNo=${maxRound}`)
      .then(function(response) {
        const lottoList = response.data
  
        setNumberList(calcNoCount(lottoList, true))
        
        // 1번~9번까지 중에서 3개
        while (tempArr.length < 3) {
          let num = numberList[Math.floor(Math.random() * 9)][0]
          if (!tempArr.includes(num)) {
            tempArr.push(num)
          }
        }
        //10번~27번까지 중에서 2개
        while (tempArr.length < 5) {
          let num = numberList[Math.floor(Math.random() * 18) + 9][0]
          if (!tempArr.includes(num)) {
            tempArr.push(num)
          }
        }
        // 28번~45번까지 중에서 1개를 뽑는다.
        while (tempArr.length < 6) {
          let num = numberList[Math.floor(Math.random() * 18) + 27][0]
          if (!tempArr.includes(num)) {
            tempArr.push(num)
          }
        }
        setResultSet(tempArr)
      })
    }
  }

  return (
    <div className="mg-30">
      <h1>로또 추천2</h1>
      <div>
        <button onClick={doRecommend2}>번호추천</button>
      </div>
      <div>
        <div id="win_no_wrap2">
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[0]}</span>
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[1]}</span>
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[2]}</span>
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[3]}</span>
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[4]}</span>
            <span className="win_no" style={{
              fontSize: '9pt'
            }}>{resultSet[5]}</span>
          </div>
      </div>
    </div>
  )
}
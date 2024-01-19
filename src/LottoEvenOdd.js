import axios from "axios"
import { useEffect, useState } from "react"

export default function LottoEvenOdd() {
  const [even, setEven] = useState(0)
  const [odd, setOdd] = useState(0)
  const [drwLowNo, setDrwLowNo] = useState(1)
  const [drwHighNo, setDrwHighNo] = useState(9999)

  useEffect(() => {
    getEvenOddCnt()
  }, [])

  function getEvenOddCnt() {
    if (drwLowNo < 1) {
      alert('유효하지 않은 번호입니다.')
      document.querySelector('.drw-no-input').value = ''
      return
    }
    if (drwLowNo > drwHighNo) {
      alert('유효하지 않은 입력입니다.')
      document.querySelectorAll('.drw-no-input')[0].value = ''
      document.querySelectorAll('.drw-no-input')[1].value = ''
      return
    }
    let body = {
      "drwLowNo": drwLowNo,
      "drwHighNo": drwHighNo,
    }
    axios.post('lotto/even-odd-cnt', body)
    .then((response) => {
      const data = response.data
        
      setEven(data[0].drwtNo1 + data[0].drwtNo2 + data[0].drwtNo3 + data[0].drwtNo4 + data[0].drwtNo5 + data[0].drwtNo6)
      setOdd(data[1].drwtNo1 + data[1].drwtNo2 + data[1].drwtNo3 + data[1].drwtNo4 + data[1].drwtNo5 + data[1].drwtNo6)
      document.querySelectorAll('.drw-no-input')[0].value = ''
      document.querySelectorAll('.drw-no-input')[1].value = ''
    })
  }

  return (
    <div className="App">
      <h1>홀짝 통계</h1>
      <div>
        <input type="number" className="drw-no-input mg-10"
              onChange={e => setDrwLowNo(e.target.value)} onKeyUp={e => {
                if (e.key === 'Enter') {
                  getEvenOddCnt()
                }
              }}/>~ 
        <input type="number" className="drw-no-input mg-10"
              onChange={e => setDrwHighNo(e.target.value)} onKeyUp={e => {
                if (e.key === 'Enter') {
                  getEvenOddCnt()
                }
              }}/><br/>
        <button onClick={getEvenOddCnt}>조회</button>
      </div>
      <div>{drwLowNo}회 ~ {drwHighNo}회</div>
      <div className="mg-30">
        홀수: {odd}개, {(odd/(odd+even) * 100).toFixed(2)}%<br/>
        짝수: {even}개, {(even/(odd+even) * 100).toFixed(2)}%<br/>
      </div>
      <div>
        <a href="/"><button className="mg-10">목록으로</button></a>
      </div>
    </div>
  )
}
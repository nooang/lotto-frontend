import axios from "axios"
import { useEffect, useState } from "react"
import { calcNoCount } from "./NumberStatistics"

export default function LottoDrwSearch() {
  const [drwLowNo, setDrwLowNo] = useState(0)
  const [drwHighNo, setDrwHighNo] = useState(0)
  const [drwtNumbers, setDrwtNumbers] = useState([])
  const [ascending, setAscending] = useState(true)
  const [numberList, setNumberList] = useState(() => {
    const initialList = []

    for (let i = 0; i < 45; i++) {
      initialList.push([`${i+1}번`, 0])
    }
    return initialList
  })

  function ViewDrwtNumbers() {
    if (drwLowNo - drwHighNo > 0) {
      alert('유효하지 않은 입력입니다.')
      return
    }
    
    axios.get(`/lotto/all-number?drwLowNo=${drwLowNo}&drwHighNo=${drwHighNo}`)
    .then(function(response) {
      const lottoList = response.data
      setDrwtNumbers(lottoList)

      setNumberList(calcNoCount(lottoList, ascending))
    })
  }

  function handleSorting() {
    setAscending((prevAscending) => !prevAscending)
    ViewDrwtNumbers()
  }

  return (
    <div className="App">
      조회하고 싶은 로또 구간을 입력해주세요
      <div>
        작은 숫자: <input type="number" onChange={(e) => {
          setDrwLowNo(e.target.value)
        }}/><br/>
        큰 숫자: <input type="number" onChange={(e) => {
          setDrwHighNo(e.target.value)
        }} onKeyUp={(e) => {
          if (e.key === 'Enter') ViewDrwtNumbers()
        }}/><br/>
        <button onClick={ViewDrwtNumbers}>조회</button><br/>
      </div>

      <div>
        <button><a href="/">목록으로</a></button>
      </div>

      <div className="mg-30">
        <button className="mb-10" onClick={handleSorting}>
          {ascending ? '내림차순 조회' : '오름차순 조회'}
        </button><br />
        <div className="count_wrap">
          {numberList.map(([label, count], key) => {
            if (count > 0 ) {
              return (
                <div key={key} className="mb-5">
                  {label}: {count}회
                </div>
              )
            }
          })}
        </div>
        
      </div>
      
      {drwtNumbers.map((item, key) => (
        <div>
          <span className="mr-5">{item.drwNo}회: </span>
          <span className="mr-5">{item.drwtNo1}</span>
          <span className="mr-5">{item.drwtNo2}</span>
          <span className="mr-5">{item.drwtNo3}</span>
          <span className="mr-5">{item.drwtNo4}</span>
          <span className="mr-5">{item.drwtNo5}</span>
          <span className="mr-5">{item.drwtNo6}</span>
          <span className="mr-5">{item.bnusNo}</span>
        </div>
      ))}
    </div>
  )
}
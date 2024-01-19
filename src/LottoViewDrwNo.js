import axios from "axios"
import { useEffect, useState } from "react"

export default function LottoViewDrwNo() {
  const [drwtNo, setDrwtNo] = useState(0)
  const [drwNoList, setDrwNoList] = useState([])

  function getDrwNoList() {
    if (drwtNo > 45 || drwtNo < 1) {
      alert('유효하지 않은 번호입니다.')
      document.getElementById('drwt-no').value = ''
      return
    }

    axios.get(`/lotto/drw-no-list/${drwtNo}`)
    .then((response) => {
      setDrwNoList(response.data)
      document.getElementById('drwt-no').value = ''
    })
  }

  return (
    <div className="App">
      <h1>번호가 나온 회차 조회</h1>
      <div>
        번호를 입력해주세요<br/>
        <input id="drwt-no" type="number" onChange={e => setDrwtNo(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  getDrwNoList()
                }
              }}/>
        <button onClick={getDrwNoList}>조회</button>
      </div>
      <div className="mg-10">총 {drwNoList.length}회 등장</div>
      <div className="drw_no_wrap mg-30">
        {drwNoList.map((item, index) => (
          <span className="mg-10">{item.drwNo}회</span>
        ))}
      </div>
      <a href="/"><button className="mg-10">목록으로</button></a>
    </div>
  )
}
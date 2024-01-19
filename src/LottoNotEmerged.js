import axios from "axios"
import { useState } from "react"

export default function LottoNotEmerged() {
  const [drwtNo1, setDrwtNo1] = useState(0)
  const [drwLowNo, setDrwLowNo] = useState(0)
  const [drwHighNo, setDrwHighNo] = useState(0)
  const [notEmerged, setNotEmerged] = useState([])

  function getNotEmerged() {
    let body = {
      "drwtNo1": drwtNo1,
      "drwLowNo": drwLowNo,
      "drwHighNo": drwHighNo,
    }
    axios.post(`/lotto/not-emerged`, body)
    .then((response) => {
      setNotEmerged(response.data)
    })
  }

  return (
    <div className="App">
      <h1>미출현 번호 정보 조회</h1>
      <div className="mg-30">
        조회할 번호 입력: <input type="number" onChange={e => setDrwtNo1(e.target.value)} 
                              onKeyUp={e => {
                                if(e.key === 'Enter') getNotEmerged()
                              }} /><br/>
        낮은 회차 입력: <input type="number" onChange={e => setDrwLowNo(e.target.value)} 
                              onKeyUp={e => {
                                if(e.key === 'Enter') getNotEmerged()
                              }} /><br/>
        높은 회차 입력: <input type="number" onChange={e => setDrwHighNo(e.target.value)} 
                              onKeyUp={e => {
                                if(e.key === 'Enter') getNotEmerged()
                              }} /><br/>
        <button className="mg-10" onClick={getNotEmerged}>조회</button>  
      </div>
      <div>
        {notEmerged.length > 0 && notEmerged.length}회 등장하지 않았습니다.
        <div>아래는 등장하지 않은 회차들입니다.</div>
        <div className="mg-30 drw_no_wrap">
          {notEmerged.map((item, index) => (
              <div className="mg-10">
                {item.drwNo}회
              </div>
          ))}
        </div>
      </div>
      <a href="/"><button>목록으로</button></a>
    </div>
  )
}
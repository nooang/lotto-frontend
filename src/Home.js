import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [maxRound, setMaxRound] = useState(0)
  const [round, setRound] = useState({})

  // 최신 회차 
  useEffect(() => {
    axios.get('/lotto/max-round').then((response) => {
      setMaxRound(response.data)
    })
  }, [])

  // 회차별 번호 조회
  function GetDrwtNoByRound(e) {
    if (round > maxRound || round < 1) {
      alert('유효하지 않은 번호입니다.')
      return
    }

    axios.get(`/lotto/drwt-no/${round}`)
    .then((response) => {
      console.log(response.data)
      const drwt_no1 = document.querySelector('.drwt_no1')
      const drwt_no2 = document.querySelector('.drwt_no2')
      const drwt_no3 = document.querySelector('.drwt_no3')
      const drwt_no4 = document.querySelector('.drwt_no4')
      const drwt_no5 = document.querySelector('.drwt_no5')
      const drwt_no6 = document.querySelector('.drwt_no6')
      const bnus_no = document.querySelector('.bnus_no')

      drwt_no1.innerHTML = response.data.drwtNo1
      drwt_no2.innerHTML = response.data.drwtNo2
      drwt_no3.innerHTML = response.data.drwtNo3
      drwt_no4.innerHTML = response.data.drwtNo4
      drwt_no5.innerHTML = response.data.drwtNo5
      drwt_no6.innerHTML = response.data.drwtNo6
      bnus_no.innerHTML = response.data.bnusNo
    })
  }

  return (
    <div className="App">
      여기는 홈입니다.
      <div>현재 {maxRound}회까지 업데이트 되었습니다.</div>

      <p>조회하고 싶은 회차를 입력해주세요.</p>
      <input type="number" onChange={(e) => (setRound(e.target.value))} 
             onKeyUp={(e) => {
              if (e.key === 'Enter') {
                GetDrwtNoByRound()
              }
             }}/>
      <button onClick={GetDrwtNoByRound}>검색</button>

      <div>
        <span className="drwt_no1 mg-10"></span>
        <span className="drwt_no2 mg-10"></span>
        <span className="drwt_no3 mg-10"></span>
        <span className="drwt_no4 mg-10"></span>
        <span className="drwt_no5 mg-10"></span>
        <span className="drwt_no6 mg-10"></span>
        <span className="bnus_no mg-10"></span>
      </div>

      <div style={{marginTop: "15px"}}>
        <div><button><a href="/lotto">로또 입력기로 이동</a></button></div>
        <div><button><a href="/analysis">로또 분석기로 이동</a></button></div>
        <div><button><a href="/number-statistics">번호별 통계</a></button></div>
        <div><button><a href="/drw-search">회차 구간별 검색</a></button></div>
        <div><button><a href="/prize">당첨금 조회</a></button></div>
        <div><button><a href="/score">번호 입력으로 순위 확인</a></button></div>
        <div><button><a href="/random-pick">번호 랜덤 뽑기</a></button></div>
        <div><button><a href="/lotto-info">회차별 정보 조회</a></button></div>
        <div><button><a href="/recommend">로또 번호 추천</a></button></div>
        <div><button><a href="/list-drwt-no">번호로 회차 리스트 조회</a></button></div>
        <div><button><a href="/even-odd">홀짝 조회</a></button></div>
        <div><button><a href="/sequened">번호가 연속된 회차 조회</a></button></div>
        <div><button><a href="/not-emerged">미출현 번호 정보 조회</a></button></div>
      </div>
    </div>
  )
}
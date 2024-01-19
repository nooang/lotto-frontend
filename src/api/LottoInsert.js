import axios from "axios"
import { useEffect, useState } from "react"

export default function LottoInsert() {
  const [lottoData, setLottoData] = useState('')
  

  function insertLotto(e) {
    setLottoData(e.target.value)
  }

  useEffect(() => {
    if (lottoData !== '') {
      const lottoVO = JSON.parse(lottoData)
      axios.post('http://localhost:8080/lotto/insert', lottoVO)
      .then(function(response) {
        console.log('성공!')
      }).catch(function() {
        console.log('실패!')
      })
    }
  }, [lottoData])


  return (
    <div>
      <div>로또 JSON을 입력해주세요</div>
      <div className="content_wrap">
        <textarea id="lotto_data" onChange={insertLotto}></textarea>
        <div className="link">
          <button onClick={insertLotto}>로또 정보 입력</button>
          <button><a href="/analysis">분석하러 가기</a></button>
          <button><a href="/">목록으로 가기</a></button>
        </div>
      </div>

    </div>
  )
}
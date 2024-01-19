import { useEffect, useState } from "react"

export default function LottoRandom() {
  const [numList, setNumList] = useState([0, 0, 0, 0, 0, 0])
  
  function numberCreate() {
    let list = []

    while (list.length < 6) {
      let count = 0 
      let num = Math.floor(Math.random() * 45) + 1
      
      for (let i = 0; i < list.length; i++) {
        if (num === list[i]) count++
      }
      
      if (count === 0) list.push(num)
    }

    setNumList(list)
  }

  return (
    <div className="App">
      로또 번호를 랜덤으로 추천합니다.<br />
      <button onClick={numberCreate}>뽑기</button>

      <div>
        <span className="rand_num">{numList[0]}</span>
        <span className="rand_num">{numList[1]}</span>
        <span className="rand_num">{numList[2]}</span>
        <span className="rand_num">{numList[3]}</span>
        <span className="rand_num">{numList[4]}</span>
        <span className="rand_num">{numList[5]}</span>
      </div>
      <div><button><a href="/">목록으로</a></button></div>
    </div>
  )
}
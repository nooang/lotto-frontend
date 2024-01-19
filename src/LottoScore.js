import axios from "axios"
import { useState } from "react"

export default function LottoScore() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [num3, setNum3] = useState('')
  const [num4, setNum4] = useState('')
  const [num5, setNum5] = useState('')
  const [num6, setNum6] = useState('')
  const [rankList, setRankList] = useState([
    ["1등", 0],
    ["2등", 0],
    ["3등", 0],
    ["4등", 0],
    ["5등", 0],
  ])

  let numberObject = {
    "num1": num1,
    "num2": num2,
    "num3": num3,
    "num4": num4,
    "num5": num5,
    "num6": num6,
  }

  function setNum(e, i) {
    const value = parseInt(e.target.value)

    if (value < 1 || value > 45) {
      e.target.value = ''
    }
    else {
      if (i === 1) setNum1(value)
      else if (i === 2) setNum2(value)
      else if (i === 3) setNum3(value)
      else if (i === 4) setNum4(value)
      else if (i === 5) setNum5(value)
      else setNum6(value)
    }
  }

  function checkDupl(e, i) {
    let value = parseInt(e.target.value)
    
    if (i === 1) {
      if (                               value === numberObject.num2 ||
          value === numberObject.num3 || value === numberObject.num4 ||
          value === numberObject.num5 || value === numberObject.num6) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    else if (i === 2) {
      if (value === numberObject.num1 ||
          value === numberObject.num3 || value === numberObject.num4 ||
          value === numberObject.num5 || value === numberObject.num6) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    else if (i === 3) {
      if (value === numberObject.num1 || value === numberObject.num2 ||
                                         value === numberObject.num4 ||
          value === numberObject.num5 || value === numberObject.num6) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    else if (i === 4) {
      if (value === numberObject.num1 || value === numberObject.num2 ||
          value === numberObject.num3 || 
          value === numberObject.num5 || value === numberObject.num6) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    else if (i === 5) {
      if (value === numberObject.num1 || value === numberObject.num2 ||
          value === numberObject.num3 || value === numberObject.num4 ||
                                         value === numberObject.num6) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    else {
      if (value === numberObject.num1 || value === numberObject.num2 ||
          value === numberObject.num3 || value === numberObject.num4 ||
          value === numberObject.num5                               ) {
        alert('같은 숫자는 입력할 수 없습니다.')
        e.target.value = ''
        return true
      }
    }
    return false
  }

  function sendNumberObject(e, i) {
    if (e.key === 'Enter') {
      if(checkDupl(e, i)) return

      if (num1 === '' || num2 === '' || num3 === '' ||
          num4 === '' || num5 === '' || num6 === '') {
        alert('입력되지 않은 칸이 있습니다.')
        return
      }

      axios.post('/lotto/score-list', numberObject)
      .then((response) => {
        const data = response.data
        let updatedRankList = Array.from({length: 5}, (_, i) => [`${i+1}등`, 0])

        for (let i = 0; i < data.length; i++) {
          if (data[i].score === 6) updatedRankList[0][1]++
          else if (data[i].score === 5.5) updatedRankList[1][1]++
          else if (data[i].score === 5) updatedRankList[2][1]++
          else if (data[i].score >= 4) updatedRankList[3][1]++
          else if (data[i].score >= 3) updatedRankList[4][1]++
        }

        setRankList(updatedRankList)

        document.getElementsByClassName('num-input')[0].value = ''
        document.getElementsByClassName('num-input')[1].value = ''
        document.getElementsByClassName('num-input')[2].value = ''
        document.getElementsByClassName('num-input')[3].value = ''
        document.getElementsByClassName('num-input')[4].value = ''
        document.getElementsByClassName('num-input')[5].value = ''
        document.getElementsByClassName('num-input')[0].focus()
        setNum1('')
        setNum2('')
        setNum3('')
        setNum4('')
        setNum5('')
        setNum6('')
      })
    }
  }


  return (
    <div className="App">
      <p>
        번호들을 입력해주세요<br/>
        모두 입력한 뒤 <strong>엔터</strong>를 누르면 조회됩니다.
      </p>
      <div>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 1)}}
          onKeyUp={(e) => {sendNumberObject(e, 1)}} onBlur={(e) => {checkDupl(e, 1)}}/>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 2)}}
          onKeyUp={(e) => {sendNumberObject(e, 2)}} onBlur={(e) => {checkDupl(e, 2)}}/>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 3)}}
          onKeyUp={(e) => {sendNumberObject(e, 3)}} onBlur={(e) => {checkDupl(e, 3)}}/>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 4)}}
          onKeyUp={(e) => {sendNumberObject(e, 4)}} onBlur={(e) => {checkDupl(e, 4)}}/>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 5)}}
          onKeyUp={(e) => {sendNumberObject(e, 5)}} onBlur={(e) => {checkDupl(e, 5)}}/>
        <input type="number" className="num-input mr-5" onChange={(e) => {setNum(e, 6)}}
          onKeyUp={(e) => {sendNumberObject(e, 6)}} onBlur={(e) => {checkDupl(e, 6)}}/>

      </div>
      <p>
        {rankList.map(([label, count], index) => (
          <div key={index} className="mb-5">
            {label}: {count}회
          </div>
        ))}
      </p>
      <button><a href="/">목록으로</a></button>
    </div>
  )
}
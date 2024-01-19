import { useEffect, useState } from "react"
import LottoSequenced2 from "./LottoSequenced2"
import axios from "axios"

export default function LottoSequenced() {
  const [num, setNum] = useState(1)
  const elements = Array.from({length: 45})
  const [sequencedList, setSequencedList] = useState([])
  const [maxSequenceList, setMaxSequenceList] = useState([])

  useEffect(() => {
    axios.get(`/lotto/sequence-drw-no/${num}`)
    .then((response) => {
      setSequencedList(prevList => [...prevList, response.data])

      let temp = 0;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].drwHighNo - response.data[i].drwLowNo + 1 > temp) {
          temp = response.data[i].drwHighNo - response.data[i].drwLowNo + 1
        }
      }
      setMaxSequenceList(prevMaxList => [...prevMaxList, temp])
    })
    .catch((error) => {
      console.log("Network error: ", error)
    })
    
    if (num < 45) {
      setNum(num + 1)
    }
  }, [num])

  return (
    <div className="App">
      {elements.map((_, idx) => (
        <LottoSequenced2 
          sequencedList={sequencedList} 
          maxSequenceList={maxSequenceList}
          idx={idx}/>
      ))}
      <div className="mg-30">
        <a href="/"><button>목록으로</button></a>
      </div>
    </div>
  )
}
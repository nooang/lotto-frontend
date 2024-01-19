import axios from "axios"
import { useEffect, useState } from "react"

export default function NumberStatistics() {
  const [numberList, setNumberList] = useState(() => {
    const initialList = []
    
    for (let i = 0; i < 45; i++) {
      initialList.push([`${i+1}번`, 0])  
    }
    return initialList
  })
  const [ascending, setAscending]= useState(true)
  

  useEffect(() => {
    axios.get('/lotto/all-number')
    .then((response) => {
      const lottoList = response.data
      
      setNumberList(calcNoCount(lottoList, ascending))
    })
  }, [ascending])

  function handleSorting() {
    setAscending((prevAscending) => !prevAscending)
  }


  return (
    <div className="App">
      <h4>역대 번호별 통계</h4>
      <button className="mb-10 toggle_sort" onClick={handleSorting}>
        {ascending ? '내림차순 조회' : '오름차순 조회'}
      </button>

      <div className="count_wrap">
        {numberList.map(([label, count], index) => (
          <div key={index} className="mb-5">
            {label}: {count}회
          </div>
        ))}
      </div>
      <button><a href="/">목록으로</a></button>
    </div>
  )
}

export function calcNoCount(lottoList, ascending) {
  let updatedNumberList = Array.from({ length: 45 }, (_, i) => [`${i + 1}번`, 0])

  for (let i = 0; i < lottoList.length; i++) {
    updatedNumberList[lottoList[i].drwtNo1 - 1][1]++
    updatedNumberList[lottoList[i].drwtNo2 - 1][1]++
    updatedNumberList[lottoList[i].drwtNo3 - 1][1]++
    updatedNumberList[lottoList[i].drwtNo4 - 1][1]++
    updatedNumberList[lottoList[i].drwtNo5 - 1][1]++
    updatedNumberList[lottoList[i].drwtNo6 - 1][1]++
    updatedNumberList[lottoList[i].bnusNo - 1][1]++
  }
  
  updatedNumberList.sort(function(a, b) {
    return ascending ? b[1] - a[1] : a[1] - b[1]
  })

  return updatedNumberList
}
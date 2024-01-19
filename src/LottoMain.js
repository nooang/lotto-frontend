import axios from "axios";
import { useRef } from "react";

function LottoMain() {
  const numRef = useRef(0)

  // 숫자가 나온 기록 출력
  const getNumCount = () => {
    let num = numRef.current.value

    if (num < 46 && num > 0) {
      axios.get(`http://localhost:8080/lotto/count/${num}`)
      .then((response) => {
        const numCntResult = document.getElementById('num_cnt_result')
        
        let html = `
        <div>
          ${num}는(은) <span class="red">${response.data.count}</span>회 등장했습니다.
        </div>`

        numCntResult.innerHTML += html
        numRef.current.value = ''
      })
    }
    else {
      alert('범위가 맞지 않습니다. 다시 입력하세요')
      numRef.current.focus()
    }
  }

  const cleanAllTxt = () => {
    document.getElementById('num_cnt_result').innerText = ''
  }

  return (
    <div className='txt-center'>
      <h3>조회하고 싶은 번호 입력</h3>
      <div className="mb-10">
        번호를 입력하면 얼마나<br/>
        등장했는지 알려줍니다.
      </div>
      <div className="mb-10">
        <input type='number' ref={numRef} onKeyUp={(e) => {
          if (e.key === 'Enter') {
            getNumCount()
          }
        }}/>
        <button onClick={getNumCount}>조회</button>
      </div>
        <div id="num_cnt_result"></div>
      <button id="txt_clear" onClick={cleanAllTxt}>지우기</button>
      <button><a href="/">목록으로 가기</a></button>
    </div>
  );
};

export default LottoMain;
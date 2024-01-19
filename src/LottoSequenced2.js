export default function LottoSequenced2({sequencedList, maxSequenceList, idx}) {

  return (
    <div className="mg-30">
      <h4>{idx+1}번의 연속 정보</h4>
      <div>
        2번 이상 연속된 회수: {sequencedList.length > 44 && sequencedList[idx].length}회
      </div>
      <div>
        최대 연속된 회수: {maxSequenceList.length > 44 && maxSequenceList[idx]}
      </div>
      {sequencedList.length > 44 && sequencedList[idx].map((item, index) => (
        <div>
          <span className="mg-10">{item.drwLowNo}회</span>~
          <span className="mg-10">{item.drwHighNo}회</span>
        </div>
      ))}
    </div>
  )
}
export default function PrizeInfoTable({item, key}) {
  return (
    <tr>
      <td>{item.drwNo}</td>
      <td>{item.totSellamnt.toLocaleString()}원</td>
      <td>{item.firstAccumamnt.toLocaleString()}원</td>
      <td>{item.firstWinamnt.toLocaleString()}원</td>
      <td>{item.firstPrzwnerCo.toLocaleString()}명</td>
    </tr>
  )
}
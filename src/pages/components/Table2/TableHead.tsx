import React from 'react';

type Props = {
  attributes: ClientAttr[]
}

const TableHead: React.FC<Props> = (P) => {

  let sorted = [...P.attributes].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  return (
    <tr>
      <th>&nbsp;</th>
      {sorted.map( (e: ClientAttr, i:number) => {
        return <th key={i}>{e.name}</th>
      })}
    </tr>
  )
}
export default TableHead;
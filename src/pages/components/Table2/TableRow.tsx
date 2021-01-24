import React from 'react';

import InputCell from './InputCell';

type Props = {
  item: any
  attributes: ClientAttr[]
  catName: string
}

const TableRow: React.FC<Props> = (P) => {

  let sorted = [...P.attributes].sort( (a, b) => {
    if(a.priority < b.priority){
      return -1
    } else {
      return 1
    }
  });

  return(
    <tr>
      <td>
      </td>
      {sorted.map( (e: ClientAttr, i: number) => {
        if(e.type !== 'number'){
          return <td key={i}>{P.item[e.name]}</td>
        } else {
          return <InputCell key={i} attrName={e.name} catName={P.catName} item={P.item} type={e.type} />
        }

      })}
    </tr>
  )
}

export default TableRow;
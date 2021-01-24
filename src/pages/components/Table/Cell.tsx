import React from 'react';

type Props = {
  value: string
}

const Cell: React.FC<Props> = (P) => {

  return (
    <td className='table-cell'>
      <p>{P.value}</p>
    </td>
  )
}

export default Cell;
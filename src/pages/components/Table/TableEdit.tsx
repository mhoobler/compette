import React from 'react';

type Props = {
  uid: string
  category: string
  clearSelect: () => void;
}

const TableEdit: React.FC<Props> = (P) => {
  
  return(
    <div onClick={() => P.clearSelect()}>TableEdit: {P.category}</div>
  )
}

export default TableEdit;
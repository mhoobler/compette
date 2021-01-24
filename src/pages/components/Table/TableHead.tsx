import React from 'react';

type Props = {
  attributes: any
}

const Head: React.FC<Props> = (P) => {
  
  const keys = P.attributes !== null ? Object.keys(P.attributes) : [];


  keys.sort( (a,b) => {
    if(P.attributes[a].priority > P.attributes[b].priority){
      return 1
    } else {
      return -1
    }
  });

  return (
    <thead>
      <tr>
        <td>
          &nbsp;
        </td>
      {
        keys.map( (e: string, i: number) => {
          return <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
        })
      }
      </tr>
    </thead>
  )
}

export default Head;
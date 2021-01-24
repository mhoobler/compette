import React, {useState} from 'react';

type Props = {
  name: string
  depth: number
  value: Array<string> | string | number
  valueIsChild: boolean
}

const RenameCell: React.FC<Props> = (P) => {

  const [name, setName] = useState(P.name);
  const [value, setValue] = useState(P.value);
  console.log(name);

  const getBrancheString = (depth: number) => {
    if(depth === 0){
      return '';
    } else {
      let str = String('|\xa0\xa0\xa0')
                .repeat(Math.max(0, P.depth));
      return str;
    }
  }

  if(P.valueIsChild){

    return (
      <div
      className='tree-list-item'
      data-attribute={getBrancheString(P.depth)}
      >
        <input
        type='text'
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
    )

  } else {

    return(
      <div 
      className='tree-list-item'
      data-attribute={getBrancheString(P.depth)}
      >
        <input
        type='text'
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
    )

  }
}

export default RenameCell;
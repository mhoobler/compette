import React, {useState} from 'react';

const R = ['test', 'Test', 'apple', 'testing', 'hour', 'hourly', '123test']

const SimpleRegex: React.FC = () => {

  const [search, setSearch] = useState('');
  let regex = new RegExp(search.toLowerCase());

  const handleInput = (str: string) => {
    setSearch(str.replace(/[^\w]/, ''));
  }

  return (
    <div>
      <input
      value={search}
      onChange={(e) => {handleInput(e.currentTarget.value)}}
      />
      <ul>
        {R.map( (e: string, i: number) => {
          let res = regex.exec(e.toLowerCase());
          if(res !== null) {
            return <div key={i}>{e}</div>
          } else {
            return null;
          }
          
        })}
      </ul>
    </div>
  )
}

export default SimpleRegex;
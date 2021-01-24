import React from 'react';

import Table from '../components/Table2/Table';
import EditTable from '../components/Table2/EditTable';
import PageHead from '../Tables2/PageHead';

import {TableContext} from '../Tables2/TableContext';

const Tables2Page: React.FC = () => {
  const { userID, clientCats, editCat } = React.useContext(TableContext) as ContextType

  return (
    <div id='table-page'>
      <PageHead />
      <div>
        {clientCats.map( (e: ClientCat) => {
          if(editCat !== null && editCat.name === e.name){
            return (
              <EditTable 
              uid={userID}
              catName={e.name}
              />
            )
          } else {
            return (
              <Table
              key={e.name} 
              clientCat={{...e}} 
              edit={false}
              />
            )
          }

        })}
      </div>
    </div>
  )
}

export default Tables2Page
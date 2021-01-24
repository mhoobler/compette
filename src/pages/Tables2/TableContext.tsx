import React, {useState, useEffect, createContext} from 'react';

import firebase from 'firebase';

export const TableContext = React.createContext<ContextType | null>(null)

const TableProvider: React.FC = ({children}) => {

  const [userID, setUserID] = useState('');
  //Use categories for writing, searchCats for reading
  const [categories, setCategories] = useState<Category>({});
  const [clientCats, setClientCats] = useState<ClientCat[]>([]);
  const [editCat, setEditCat] = useState<ClientCat | null>(null);

  //Inputs
  const [search, setSearch] = useState('');

  const categoryRef = userID !== '' ? firebase.database().ref(userID + '/categories') : null;

  useEffect( () => {
    firebase.auth().onAuthStateChanged( user => {
      user ? setUserID(user.uid) : setUserID('');
    });
    console.log(editCat);

    if(categoryRef !== null){
      categoryRef.on('value', (snapshot) => {
        console.log('LISTENER');
        let val = snapshot.val() !== null ? snapshot.val() : {};
        console.log(Object.values(val));
        console.log(val);
        
        //Get Categories
        let catArr = val !== {} ?
          convertCategories(val)
        :
          [];

        //Set Category State
        setCategories(val);
        setClientCats(catArr);

        // This is so bad omg
        // please fix this
        console.log(editCat);
        // if(editCat !== null){
        //   for(let c of catArr){
        //     if(c.name === editCat.name){
        //       if(JSON.stringify(c) !== JSON.stringify(editCat)){
        //         console.log(JSON.stringify(c));
        //         console.log(JSON.stringify(editCat))
        //         setEditCat(c);
        //       }
        //     }
        //   }
        // }

        console.log(catArr);
      })
    }
  }, [userID, editCat]);

  const convertCategories = (val: Category) => {
    // console.log(categories);
    let catArr: ClientCat[] = 
      Object.keys(val).map( catName => {
        // console.log(catName);
        
      //get Category Attributes
        let attrs = Object.keys(val[catName].attributes).map( attrName => {
          let cattr = val[catName].attributes;
          // console.log(cattr);
          return {
            name: attrName,
            priority: cattr[attrName].priority,
            type: cattr[attrName].type
          }
        });

        //get Category Items
        let items = val[catName].items ?
        Object.keys(val[catName].items).map( itemKey => {
          let citem = val[catName].items;
          return{
            ...citem[itemKey],
            key: itemKey
          }
          }) 
          : [];

        //return Categories as Array
        let cat = {
          name: catName,
          attributes: attrs,
          items: items
        };
        
        // console.log(cat);
        return cat 
      })
    
      return catArr;
  }

  const handleSearch = (input: string) => {
    let str = input.replace(/[^\w\s]/, '').toLowerCase();
    console.log(str);

    setSearch(str);
    let cats: ClientCat[] = [];
    let regex = str === '' ? new RegExp(/.*/) : new RegExp(str);
    console.log(regex);

    for(let c of convertCategories(categories)){
      let res = regex.exec(c.name.toLowerCase());
      console.log({ResONE: res});
      
      if(res) {
        cats.push(c);
      } else if(c.items){
        let items = [];
        let pass = false;
        
        for( let i of Object.keys(c.items) ){
          let name = c.items[i].name;
          let res = regex.exec(name.toLowerCase());
          console.log({ResTWO: res});
          if(res){
            items.push({
              ...c.items[i],
              key: i
            })
            pass = true
          }
        }

        if(pass) {
          console.log(items);
          let cat = {
            name: c.name,
            attributes: c.attributes,
            items: items
          }
          cats.push(cat);
        }
        
      }
    }
    console.log(cats);

    setClientCats(cats);
  }

  const submitNewCategory = (newCategory: string) => {

    if(newCategory.length > 0 && categoryRef !== null) {
      categoryRef.child(newCategory).set({
        attributes: {
          name: {
            type: 'text',
            priority: 1
          },
          quantity: {
            type: 'number',
            priority: 2
          }
        }
      });
    }

  }

  return (
    <TableContext.Provider 
    value={
      {
        userID,
        categories,
        clientCats,
        editCat,
        setEditCat,
        search,
        handleSearch,
        submitNewCategory
      }
    }>
      {children}
   </TableContext.Provider> 
  )
}

export default TableProvider;
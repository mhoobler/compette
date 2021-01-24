interface ITodo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

type ContextType = {
  userID: string
  categories: Category
  clientCats: ClientCat[]
  editCat: ClientCat | null
  setEditCat: (c: ClientCat | null) => void
  search: string
  handleSearch: (str: string) => void
  submitNewCategory: (s: string) => void
};

interface Table {
  category: string
  entries: any[]
}

//Table stuff

// type Attribute = {
//   name: string
//   priority: number
//   type: string
// }

// type Category = {
//   name: string
//   attributes: Attribute[]
//   items: any
// }

interface Category {
  [name: string]: {
    attributes: Attrbute
    items: T
  }
}

interface Attribute {
    priority: number,
    type: text
}

type ClientCat = {
  name: string
  attributes: ClientAttr[]
  items: any
}

type ClientAttr = {
  name: string
  priority: number
  type: string
}
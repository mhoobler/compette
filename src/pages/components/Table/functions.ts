import firebase from 'firebase';

type Ref = firebase.database.Reference;

const functions = {

  getLimitOrdered: (ref: Ref, limit: number) => {
    var res = {}
    ref.orderByValue().limitToFirst(3).on("value", (snapshot) => {
      const val = snapshot.val();
      res = val;
    })
    return res;
  }

}

export default functions;
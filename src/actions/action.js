
export const load = (offset) => {
  return {
    type: 'LOAD_TODO',
    payload: new Promise((resolve, reject) => {
        const ref = firebase.database().ref().child('products').orderByKey().startAt(offset).limitToFirst(6);
        ref.once('value').then(snapshot => {
        let todos = [];
        if (snapshot) {  
          snapshot.forEach(data => {
            todos.push(data.val());
          });
        } else {
          reject((Error("Network Error")));
        }
          resolve(todos);
      });
    })
  }
}   

export const count = () => {
  return {
    type: 'PAGINATION_COUNTER',
    count: new Promise((resolve, reject) => {
        const ref = firebase.database().ref().child('products');
        ref.once('value').then(snapshot => {
          if(snapshot) {  
            resolve(snapshot.numChildren());
          } else {
            reject((Error("Network Error")));
          }
        });
      })
  }
}

export const basketClient = (uid) => {
  return {
    type: 'BASKET_CLIENT',
    basket: new Promise((resolve, reject) => {
        const ref = firebase.database().ref().child('Basket').child(uid);
        ref.once('value').then(snapshot => {
        let todos = [];
        if (snapshot) {
          snapshot.forEach(data => {
            todos.push(data.val());
          });
        } else {
          reject((Error("Basket empty")));
        }
          resolve(todos);
      });
    })    
  }
}

export const removeProduct = (client, id) => {
  return {
    type: 'BASKET_CLIENT',
    basket: new Promise((resolve, reject) => {
      let ref = firebase.database().ref().child('Basket').child(client)
      ref.once('value').then(snapshot => {
        const todos = [];
        snapshot.forEach(data => {
          todos.push(data.key);
        });
        const tmp = todos[id];
        ref.child(tmp).remove();
        ref.once('value').then(snapshot => {
          let todos = [];
          if (snapshot) {
            snapshot.forEach(data => {
              todos.push(data.val());
            });
          } else {
            reject((Error('Can not remove')));
          }
            resolve(todos);
        });
      })
    })
  }
}

export const createEmail = (email) => {
  return {
    type: 'CREATE_EMAIL',
    email
  }
}

export const createPassword = (password) => {
  return {
    type: 'CREATE_PASSWORD',
    password
  }
}

export const sendName = (uid) => {
  return {
    type: 'SEND_NAME',
    uid
  }
}

export const addInLocalStorage = (email, uid) => {
  let userFirebase = { 
    email: email,
    uid 
  };
  localStorage.setItem('myFirebase', JSON.stringify(userFirebase));
  
  return {
    type: 'SEND_NAME',
    uid
  }
}

import { ref, firebaseAuth } from '../data/config'


const saveUser = (user) => (
  ref
    .child()
    .set({})
    .then( () => {} )
)
function authGoogle(){
  if(!firebaseAuth().currentUser){
    const provider = new  firebaseAuth.GoogleAuthProvider();
   provider.addScoppe('https://www.googleapis.com/auth/plus.login');
   //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebaseAuth().signInWithPopup(provider)
    .then(function(result){
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(user);
    })

    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;

      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('es el mismo usuario');
      }
    });

   
  }else{
    firebaseAuth().signOut();
  }
}
const auth = (email, password) => (
  firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
      .then(saveUser)
)

const login = (email, password) => firebaseAuth().signInWithEmailAndPassword(email, password)

const logout = () => firebaseAuth().signOut()

const resetPassword = email => firebaseAuth().sendPasswordResetEmail(email)

export {
  saveUser,
  auth,
  login,
  logout,
  resetPassword,
  authGoogle
}
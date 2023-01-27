import { Firebase } from './Firebase/config';
import { getFirestore, collection, getDocs,deleteDoc,setDoc,doc} from 'firebase/firestore/lite'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function App() {


  return (
    
    <div className="App">
        <button onClick={async()=>{

       const auth = getAuth();
       createUserWithEmailAndPassword(auth, 'arshad@gmail.com', '123456')
         .then(async(userCredential) => {
           // Signed in 
           const user = userCredential.user;
           console.log(user)
           const db= getFirestore(Firebase);
           const productCollection = collection(db,'products');
           const productSnapshot = await getDocs(productCollection);
           const productList = productSnapshot.forEach((obj)=>{
            console.log(obj.data())
           })
           return productList;  
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorCode)
           console.log(errorMessage);
           // ..
         });
        }}>add data</button>
         <button onClick={async()=>{
         const db= getFirestore(Firebase);
         const productCollection = collection(db,'products');
         const productSnapshot = await getDocs(productCollection);
         const productList = productSnapshot.forEach((obj)=>{
          console.log(obj.data())
         })
         return productList;  
        }}>get data</button>


        <button onClick={async()=>{
          const db= getFirestore(Firebase);
          const deleteData = await deleteDoc(doc(db, "products", "DrAPvWCpdo8xY9ObrCjZ")); 
          console.log("deleted"); 
          return deleteData; 
   
        }}
        >Delete </button>

        
        <button onClick={async()=>{
          const db= getFirestore(Firebase);
          const updateData = await setDoc(doc(db, "products", "4bYIaSeb1jBAD1Tcv40a"),{ 
            name:'Moto New'  
          }) 
          console.log("updated"); 
          return updateData;
        }}>update one</button>
    </div>
  );
}

export default App;

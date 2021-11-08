import axios from 'axios'
import Hooks from '../utils/index'
 const callGetAllBooksApi= async  () =>{
    const {setAllBooks} = Hooks()
    await new Promise(async(resolve,reject)=>{
    await axios.get(`https://henri-potier.techx.fr/books`)
    .then(async res  => {
       console.log("result success" , res)
       resolve(res)
       if(res.status===200){
        setAllBooks(res.data)
       }

    }).catch((error)=>{
        console.log("result error" , error)
        reject(error)
    })
   }) 
}
 const callGetPanniersByBooks= ({booksIds}) =>{
    axios.get(`https://henri-potier.techx.fr/books/${booksIds}/commercialOffers`)
    .then(res => {
        console.log("result success" , res)
    }) 
    .catch((error)=>{
        console.log("result error" , error)

    })
}

export {callGetAllBooksApi, callGetPanniersByBooks}
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { getAllBooks , getPannierByBooks, handleBookToPannierList, searchBookList, handleDeleteBookFromList} from '../store/actions';
import axios from 'axios'
 const  Hooks = () =>{
    const state = useSelector(state => state)
    const [listePanier,setListPanier]=useState(state.listPannier)
    const dispatch = useDispatch();
    useEffect(() => {
        setListPanier(state.listPannier)
    }, [state.listPannier])
    const callGetAllBooksApi= async  () =>{
        await new Promise(async(resolve,reject)=>{
            await  axios.get(`https://henri-potier.techx.fr/books`)
                    .then(async res  => {
                    console.log("result success" , res)
                    resolve(res)
                    if(res.status===200){
                        dispatch(getAllBooks({payload: res.data}))
                    }

                    }).catch((error)=>{
                        console.log("result error" , error)
                        reject(error)
                    })
        }) 
    }
    const callGetPanniersByBooks= async ({booksIds, action}) =>{
        await new Promise(async(resolve,reject)=>{
            await   axios.get(`https://henri-potier.techx.fr/books/${booksIds}/commercialOffers`)
                    .then(res => {
                        console.log("result success" , res)
                        resolve(res)
                        if(res.status===200){
                            dispatch(getPannierByBooks({payload:  {offers:res.data.offers, action}}))
                        }
                    }) 
                    .catch((error)=>{
                        console.log("result error" , error)
                        reject(error)
                    })

        }) 
    }  
    const handleBookToPannier = async  ({book,type,action}) =>{
       await dispatch(handleBookToPannierList({payload:{book,type,action}}))
    }
    const searchBook= (search) =>{
        dispatch(searchBookList({payload:search}))
    }
    const handleQuantityBook=  ({book,type,action}) =>{
         handleBookToPannier({book,type,action})
         let listPanier=state.listPannier
         if(action){
            listPanier=state.listPannier.filter(item=>!item.includes(book.isbn))
         }
       if(state && listPanier && listPanier.length> 0){
             callGetPanniersByBooks({booksIds:listPanier.join(','),action})
        }else{
            dispatch(getPannierByBooks({payload:  {offers:[], action}}))
        }
    }
   
    return  {
        callGetAllBooksApi , 
        callGetPanniersByBooks, 
        searchBook, 
        handleBookToPannier ,
        handleQuantityBook
        }
    
}
 export default Hooks
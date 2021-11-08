import React , {useState,useEffect, createContext } from 'react'
import CardComponent from '../CardComponent/CardComponent'
import { useSelector, useDispatch, useStore } from "react-redux"
import './CardListComponent.scss';
const CardListComponent = ({type}) => {
 
    const state = useSelector((state) => state)
    const getBooks= state ?   (state.searchWord ?   state.filtredBooks :state[type]  ) :{}
    return (
        <div className={`card-list card-list${type==='pannier' ? '--horizontal' : '--vertical'}`}>
            {
                state && getBooks && getBooks.length >0  &&  getBooks.map(book=> 
                <CardComponent key={book.isbn} book={book} type={type}></CardComponent>)
            }
           
        </div>
    )
}


export default React.memo(CardListComponent)
import React, {useEffect, Suspense} from 'react'
import { useSelector} from "react-redux"
import CardListComponent from '../CardListComponent/CardListComponent'
import {Spin, Pagination} from 'antd';
import Hooks from '../../utils/index'
import "./BooksListComponent.scss"
const BooksListComponent = () => {
    const {callGetAllBooksApi} = Hooks()
   
    const state = useSelector((state) => state)
     useEffect(() => {
            callGetAllBooksApi()
    }, [])
    return (
        <div className="books-list">
                     <Suspense fallback={<Spin />}>
                        {
                        state&& !state.loading&& 
                         <>
                         <CardListComponent type="books"></CardListComponent>
                         <Pagination className="books-list__pagination" defaultCurrent={1} total={state && state.books && state.books.length >0 ? state.books.length /10 : 1} />
                         </>
                        }
                    </Suspense>
        </div>
    )
}


export default BooksListComponent
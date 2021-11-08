import React, { useState, Suspense } from 'react'
import SearchComponent from '../SearchComponent/SearchComponent'
import './HeaderComponent.scss';
import { Badge, Spin } from 'antd';
import {Link, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
const HeaderComponent = () => {
    const state = useSelector(state=>state)
    let location = useLocation();
    const [toggleSearch, setToggleSearch]= useState(false)
    return (
        <div className="header">
            <div  className="header__content">
            <div className="header__content__left">
                {
                  location.pathname.indexOf("/pannier") > -1 &&  <Link to="/books" className="header__content__left--link"><i className="icon-arrow"></i></Link>
                }
                <h3 className="header__content__left__title">La bibliothèque d'Henri Potier </h3>
                <span className="header__content__left__switch"></span>
            </div>
            <div className="header__content__right">
              
                                 {location.pathname.indexOf("/pannier") === -1 && 
                                 <> <i className="icon-search" onClick={()=>setToggleSearch(!toggleSearch)}></i>
                                    <SearchComponent></SearchComponent>
                                    </> }
               
                <Badge count={state&& state.listPannier.length}>
                   <Link to='/pannier' className="header__content__right--link"> <span className="icon-pannier"></span></Link>
                </Badge>
            </div>
            </div>
          
           
        </div>
    )
}


export default HeaderComponent
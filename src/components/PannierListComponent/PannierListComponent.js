import React, {useEffect}  from 'react'
import CardListComponent from '../CardListComponent/CardListComponent'
import './PannierListComponent.scss';
import { useSelector } from 'react-redux';
import Hooks from '../../utils/index'
import { Tag, Divider, Button} from 'antd';

import {Link} from 'react-router-dom'
 const PannierListComponent = () => {
    const state = useSelector((state) => state)
    const {callGetPanniersByBooks} = Hooks()

    useEffect(() => {
        let listPannier=state.listPannier;
        if(listPannier && listPannier.length> 0){
            callGetPanniersByBooks({booksIds:listPannier.join(',')})
        }
    }, [])
    return (
        <div className="pannier-list">
           <div className="pannier-list__page">

                {
                    state && state.pannier && state.pannier.length>0 &&
                    <>
                    <div className="pannier-list__page__content">
                            <div className="pannier-list__page__content__title">
                            <span className="pannier-list__page__content__title--nbr">{`Mon panier - ${state.pannier.length} livre${state.pannier.length>=2 ? 's' : ''}`}</span> 
                            </div>
                            <CardListComponent type="pannier"></CardListComponent>

                    </div>
                    <div  className="pannier-list__page__total">
                    <span className="pannier-list__page__total--price">
                        <Tag color="geekblue">{`Total : `}      
                        {state.totalPrice + ` €`}</Tag>
                    </span>
                        <span className="pannier-list__page__total--offer">
                        <span className="pannier-list__page__total--value">
                            <Tag color="red">{`Total + offre: `} {state.offerPrice + ` €`}</Tag>
                            </span>
                            </span>
                    </div>
                  </>
                    }
                  <>{
                    state && !state.listPannier.length && 
                    <div className="pannier-list__page__empty">
                    <span className="pannier-list__page__empty--text">Votre panier est vide pour le moment.</span>
                    <Link to='/books'>
                          <Button type="primary" shape="round" className="pannier-list__page__empty--back" size={"large"}>
                              Retourner à la liste des livres 
                          </Button>
                    </Link>
                  </div>
                  }
                  </>
            </div> 
             
        </div>
    )
}


export default PannierListComponent
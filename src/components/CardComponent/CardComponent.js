import React, {useState, useEffect} from 'react'
import { Skeleton, Card, Avatar, Button ,Tag} from 'antd';
import ModalComponent from '../ModalComponent/ModalComponent';
import './CardComponent.scss'
import Hooks from '../../utils';
const { Meta } = Card; 
const CardComponent = ({book, type}) => {

    const [loading , setLoading] = useState(true);
    const {handleBookToPannier, handleQuantityBook} = Hooks()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const callModalDelete= (isVisible) =>{
        setIsModalVisible(isVisible);
    }
    const handleDeleteBookFromPanier = async ({book}) => {
        await callModalDelete(false)
        await handleQuantityBook({book, type:'minus',action:'delete'})
    }
     useEffect(() => {
        setTimeout(()=>{
            setLoading(false)
        },3000)
    }, [loading])
    return (
        
            <>
            {
                type === 'books' ? 
            <Card 
                hoverable style={{  marginTop: 16 }} loading={loading} className="card-comp"
                cover={loading ? <Skeleton.Image className="card-comp__skeleton"   active></Skeleton.Image> : 
                 <img alt="book" width="100%"  height="100%" className="card-comp__img" src={book.cover} />}
                actions={ [
                    <div className="card-comp__actions">
                        <span className="card-comp__actions__tag">
                            <Tag color="geekblue">{book.price + " €"}</Tag> 
                        </span>
                        <span className="card-comp__actions__btn"> 
                            <Button className="card-comp__actions__btn--add" onClick={()=>handleBookToPannier({book})}>{"Ajouter au panier"}</Button> 
                        </span>
                    </div>]}
            >
            <Meta
            
                title={book.title}
                description={
                    <span className="card-comp__description">{book && book.synopsis &&book.synopsis.length >0 && book.synopsis.map(synopsi=>synopsi)}</span>
                }
            />
            </Card>
            : 
            <>{
                loading ?  <Skeleton ></Skeleton> :
                 <Card
                bordered={false}
                loading={loading} 
                className="panier-cards"
                actions={ [
                    <div className="panier-cards__actions">
                        <span className="panier-cards__actions panier-cards__actions--price"> <Tag color="geekblue">{book.price + " €"}</Tag></span>
                        <span className=" panier-cards__actions--trash icon-trash" onClick={()=>callModalDelete(true)}></span>
                    </div>
                     ]}
                >
                    <Meta
                    className="panier-cards__title"
                    avatar={
                    <Avatar src={book.cover} className="panier-cards__avatar" shape="square" size="large" />}
                    
                    title={book.title}
                    description={
                        <span className="card-comp__quantity">
                          <span  className="card-comp__quantity--title">Quantité : </span> 
                          <div className="card-comp__quantity--buttons">

                           <Button className="card-comp__quantity__btn" onClick={()=>book.quantity>1 ? handleQuantityBook({book,type:'minus'}) : callModalDelete(true)} >
                                <span className="card-comp__quantity__btn--minus icon-minus"></span>
                            </Button> 
                            <span className="card-comp__quantity__btn--nbr">{ book.quantity }</span>
                           <Button className="card-comp__quantity__btn"  onClick={()=>handleQuantityBook({book,type:'plus'})}>
                               <span className="card-comp__quantity__btn--plus icon-plus"></span>
                            </Button>
                            </div>
                           
                            
                        </span>
                    }
                    />
                </Card>
            }</>
            }
            {
                isModalVisible &&
                <ModalComponent 
                title="Voulez-vous vraiment supprimer ce livre de votre panier ? "
                 visible={isModalVisible}
                  handleCancel={()=>callModalDelete(false)} 
                  handleOk={()=>handleDeleteBookFromPanier({book})}>
                    <Card
                        bordered={false}
                        className="modal-card"
                        >
                            <Meta
                            className="modal-card__title"
                            avatar={
                            <Avatar src={book.cover} className="modal-card__avatar" shape="square" size="large" />}
                            
                            title={book.title}
                            description={
                                <span className="card-comp__quantity__modal">
                                <span  className="card-comp__quantity__modal--title">Quantité : <span className="card-comp__quantity__modal__btn--nbr">{ book.quantity }</span></span>   
                                <span className="modal-card__actions modal-card__actions--price"> <Tag color="geekblue">{book.price + " €"}</Tag></span>
                                </span>
                            }
                            />
                    </Card>
                </ModalComponent>
            }
          
            </>

    )
}


export default CardComponent
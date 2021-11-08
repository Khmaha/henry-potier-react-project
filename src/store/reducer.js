const initialState = {
    books:[],
    loading: true,
    listPannier:[],
    pannier:[],
    totalPrice:0,
    offerPrice:0,
    filtredBooks:[],
    searchWord:"",
    countBooks:{},
    getListOffer:[],
    offers:[]

}

const reducer =    (state ={...initialState}, action) => {
    const newState={...state}


    switch (action.type) {
      case "GET_ALL_BOOKS":
        newState.books=action.payload
        newState.loading=false;
        return newState

        case "HANDLE_BOOk_TO_PANNIER_LIST":
            if(action.payload.action ){
                let countExistBookInpannier=newState.listPannier.filter(item=>item=== action.payload.book.isbn).length;
                newState.totalPrice=newState.totalPrice-(countExistBookInpannier * action.payload.book.price);
                newState.listPannier=newState.listPannier.filter(item=>!item.includes(action.payload.book.isbn))
            }else{
                if(action.payload.type){
                    let findIndex= newState.listPannier.indexOf(action.payload.book.isbn)
                    if(findIndex > -1  ){
                        if(action.payload.type==='minus'){
                                newState.totalPrice=newState.totalPrice-action.payload.book.price;
                                newState.listPannier.splice(findIndex,1)   
                        }else{
                            newState.totalPrice=newState.totalPrice+action.payload.book.price;
                            newState.listPannier.push(action.payload.book.isbn)
                        }
                    }
                }else{
                    newState.totalPrice=newState.totalPrice+action.payload.book.price;
                    newState.listPannier.push(action.payload.book.isbn)
                }
            }
           
            return newState ;  
      case "GET_PANNIER_BY_BOOKS":
          let total=newState.totalPrice;
          newState.offers=action.payload.offers
          newState.getListOffer=[]
          newState.offers.map(offer=>{
                if(offer.type==='percentage'){
                    let value=(total- (total*(offer.value)/100))
                    newState.getListOffer.push(value)
                }else if(offer.type==='minus'){
                    let value=(total - (offer.value))
                    newState.getListOffer.push(value)
                }else if(offer.type==='slice'){
                    if(total >= offer.sliceValue){
                        newState.getListOffer.push((total - ((Math.round(total/offer.sliceValue))  * (offer.value))))
                    }
                }              
          })
          newState.countBooks={}
          if(action.payload.action){
            let newPannier=newState.pannier.filter(item=>newState.listPannier.includes(item.isbn));
            newState.pannier= newPannier
        }else{
            if(newState.listPannier.length>0){
                newState.listPannier.forEach(item=>{
                    let findIndex= newState.books && newState.books.map(book=>book.isbn).indexOf(item);
                    
                    if(findIndex > -1){
                        newState.countBooks[newState.books[findIndex].isbn] =(newState.countBooks[newState.books[findIndex].isbn] || 0) + 1;
                        if(!newState.pannier.length){
                            newState.pannier.push({...newState.books[findIndex], quantity: newState.countBooks[newState.books[findIndex].isbn] })
                        }else {
                            let findIndexBookInPannier=newState.pannier.map(book=>book.isbn).indexOf(item);
                            if(findIndexBookInPannier ===-1){
                                newState.pannier.push({...newState.books[findIndex], quantity: newState.countBooks[newState.books[findIndex].isbn] })
                            }else{
                                newState.pannier[findIndexBookInPannier].quantity= newState.countBooks[newState.books[findIndex].isbn] 
                            }
                        }
                    }
                  })
            }else{
                newState.pannier=[]
            }
         
        }
        newState.offerPrice=Math.min(...newState.getListOffer)
        
        return newState ;

        case "SEARCH_BOOK_LIST":
            newState.searchWord=action.payload
            newState.filtredBooks=newState.books.filter(book=>
                book.title.toLowerCase().includes(action.payload.toLowerCase())
             || book.price.toString().includes(action.payload.toLowerCase())
             || book.synopsis.some(synopsi=>synopsi.toLowerCase().includes(action.payload.toLowerCase())))

            return newState


      default:
        return newState;
    }
  };

  export default reducer
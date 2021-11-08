   export  const getAllBooks = ({payload} ) =>{
    return {
            type:'GET_ALL_BOOKS',
            payload
        }
    }
    export const handleBookToPannierList = ({payload}) =>{
        return {
            type:'HANDLE_BOOk_TO_PANNIER_LIST',
            payload
        } 
    }
    export   const getPannierByBooks = ({payload} ) =>{
        return {
            type:'GET_PANNIER_BY_BOOKS',
            payload
        }
    }
    export   const searchBookList = ({payload} ) =>{
        return {
            type:'SEARCH_BOOK_LIST',
            payload
        }
    }

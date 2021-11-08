import { Input } from 'antd';
import Hooks from '../../utils';
const { Search } = Input;

const SearchComponent = () => {

    const {searchBook} = Hooks()
    const onSearch = value =>{
        searchBook(value)
    };
    return (
        <Search placeholder="Rechercher un livre" onSearch={onSearch} style={{ width: 200 }} className="search-comp"/>
    )
}


export default SearchComponent
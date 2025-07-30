import SearchFormReset from "./SearchFormReset";
import {Search} from "lucide-react"

const SearchForm = ({query}: {query?: string}) => {

    return (
        <form action="/" className="search-form">
            <input type="text" 
            name="query"
            defaultValue={query}
            className="search-input"
            placeholder="search startups"
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}
                <button type="submit" className="search-btn text-white">
                    <Search className="size-5"/>
                </button>
            </div>
        </form>
    );
}
 
export default SearchForm;
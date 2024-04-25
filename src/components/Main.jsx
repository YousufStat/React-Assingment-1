import BookCard from "./BookCard";
import Sort from "./Sort";
import Search from "./Search";
import data from "../data/data"
import { useState } from "react";
export default function Main() {
 
    const[books,setBooks]=useState(data);
    const [sortValue, setSortKey] = useState('');
    const [searhTerm, setSearchTerm]=useState('')
//    Search fumction
      //  console.log(searhTerm)
       const setClickTerm=(e)=>{
        e.preventDefault();
        const filteredResults = books.filter(book =>
          book.name.toLowerCase().includes(searhTerm.toLowerCase())
        );
        setBooks(filteredResults)
       }
        
    // Sorting Books function
    const handleSortChange = (sortValue) => {
        setSortKey(sortValue);
        setBooks([...sortedData]);
      };
    
      const sortedData = [...books].sort((a, b) => {
        if(sortValue==="name_asc"){
            return b.name.localeCompare(a.name);
        }
        if(sortValue==="name_desc"){
            return a.name.localeCompare(b.name);
        }
        if(sortValue==="year_asc"){
            return b.year-a.year;
        }
        if(sortValue==="year_desc"){
            return a.year-b.year;
        }
      });
      // Favorite Function
     function handleFavorite(bookId){
              const bookIndex=books.findIndex(book=>book.id===bookId);
              const newBooks=[...books];
              newBooks[bookIndex].isFav=!newBooks[bookIndex].isFav;
              setBooks(newBooks)
     }   

  return (
    <>
         <main className="my-10 lg:my-14">
      <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
        <div
          className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4"
        >
         {/* info , title , search */}
          <div>
            <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
            <h2
              className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl"
            >
              Trending Books of the Year
            </h2>
              <Search onSearch={(term)=>setSearchTerm(term)} setClickTerm={setClickTerm}/>
           
          </div>
         
         <Sort sortValue={sortValue} onSortChange={handleSortChange} />
          </div>
      </header>

      <div
        className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
       <BookCard books={books} onfav={handleFavorite}/>
      </div>
     
    </main>
      
    </>
  )
}

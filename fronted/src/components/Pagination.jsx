import { useEffect } from "react";
export default function Pagination ({currentPage,search,totalExpenses,expensesPerPage,setCurrentPage}){
    const totalPages = Math.ceil(totalExpenses/expensesPerPage);
    const pageNumbers = Array.from(
        {length:totalPages},
        (_,index)=>index+1
    );
    useEffect(()=>{
        setCurrentPage(1)
    },[search])
    return(
        <div className="flex justify-center items-center p-2">
            <button
            dissabled={currentPage === 1}
            onClick={()=>setCurrentPage(currentPage -1)}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded disabled:opacity-5">
                Prev 
          </button>

          {
            pageNumbers.map((page)=>(
                <button key={page}
                onClick={()=>setCurrentPage(page)}
                 className={`py-2 px-4 rounded-lg  m-2 ${currentPage===page?"bg-blue-500 text-white" :"bg-gray-200 hover"}`}
                  >
                    {page}
                </button>
            ))
          }

          <button
          disabled={currentPage===totalPages}
          onClick={()=>setCurrentPage(currentPage +1)}
          className="px-4 text-green-400 py-2 bg-gray-400 hover:bg-gray-500 rounded disabled:opacity-4 disbled:bg-gray-300"
         >
            Next
          </button>
        </div>
    )
}
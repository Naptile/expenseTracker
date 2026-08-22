export default function Filter({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy
}){
    const clearFilters = () =>{
                setSearch("");
                setCategoryFilter("all");
                setStartDate("");
                setEndDate("");
            };
    return(
        <div className=" w-full border border-slate-200 rounded-xl ">
            <h2 className="text-center text-2xl font-serif ">Search Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:w-2xl sm:text-2xl lg:w-full  p-4  text-center">

                <div className="">
                    <input type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Search"
                    className=" px-4 py-3 w-full  rounded-lg bg-slate-100 outline-none focus:ring-2 focus:ring-green-500"
                
                    />
                </div>

                <div className="bg-slate-200 p-3  rounded-lg">
                    <select className="w-full outline-none" 
                    value={categoryFilter}
                    onChange={(e)=>setCategoryFilter(e.target.value)}
                    >
                        <option value="all" >All categories</option>
                        <option value="food" >Food</option>
                        <option value="bills" >Bills</option>
                        <option value="shopping">Shopping</option>
                        <option value="entertainment" >Entertainment</option>
                        <option value="transport" >Transport</option>
                        <option value="education">Education</option>
                    </select>
                </div>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-slate-100 px-2 py-2 text-slate-900 rounded-lg outline-orange-600"
                        />          
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-slate-100 px-2 text-slate-900  py-2 rounded-lg outline-orange-600"
                        />
               
                <div>
                    <button
                    type="button"
                    onClick={clearFilters}
                    className="bg-red-500 rounded-lg px-4 py-2 text-white hover:bg-red-600">
                        Clear Filters
                    </button>
                </div>
                <select 
                value={sortBy}
                onChange={(e)=>setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg  active:ring-2 active:ring-orange-500 bg-slate-200"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                </select>
            </div>
        </div>
    )};
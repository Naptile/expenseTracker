export default function NotFound({search}){
    
    return(
        <div className="flex flex-col  justify-center p-4 rounded-lg items-center border-b border-b-slate-200 shadow-sm">
            <div>
                <h1 className="text-xl sm:text-4xl font-bold">{ search ? "No expense match your search" : "No Expenses yet start By adding expenses"}</h1>
            </div>
        </div>
    )
}
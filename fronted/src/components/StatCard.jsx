export default function StatCard({title, value}){
    return(        
        <div className="flex flex-col gap-3 mt-4 h-[150px] justify-center w-full rounded-xl bg-gradient-to-r from-orange-500 to-pink-600  via-indigo-600 text-center  border-l-5  border-l-blue-500 hover:from-orange-600 hover:via-indigo-800 hover:to-pink-700 hover:scale-105 transition-all">
            <h1 className="text-3xl font-bold font-serif">{title}</h1>
            <p className="text-2xl text-slate-300 font-mono">{value}</p>            
        </div>
        
    )
}
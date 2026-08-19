export default function LoadingSpiner(){
    return(
        <div className="flex flex-col gap-4 justify-center items-center  p-4">
            <div className="h-15 w-15 rounded-full border-green-500 border-5  animate-spin border-t-transparent"></div>
            <p className="text-slate-500 text-md">Loading...</p>
        </div>
    )
}
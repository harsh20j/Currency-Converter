import { HiOutlineStar, HiStar } from "react-icons/hi";

const CurrencyDropdown=({
currencies,
currency,
setCurrency,
favorite,
handleFavorit,
title=''
}) =>{
    const isFavorite=curr=>favorite.includes(curr)
    return( <div>
        <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>
        <div className="mt-1 relative">
            <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="w-full p-2 border bg-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"  >
         {favorite.map((currency)=>{
            return <option className=" bg-gray-200" value={currency} key={currency} >{currency}</option>
         })} 
           <hr/>
            {currencies
            .filter((c)=>!favorite.includes(c))
            .map((currency)=>{
                  return (  <option value={currency } key={currency}>
                        {currency}
                     </option>
                  )
            })}
            
            </select>
            
            <button onClick={()=>handleFavorit(currency)} className="  border-hidden absolute inset-y-0 right-0 pe-4 flex items-center text-sm leading-5">
               {isFavorite(currency)?<HiStar/>:
                <HiOutlineStar/>}</button>
            </div>
    </div>
    )
}
export default CurrencyDropdown;
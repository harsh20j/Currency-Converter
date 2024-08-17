import { useEffect } from "react"
import { useState } from "react"
import CurrencyDropdown from "./dropdown"
import { HiArrowsRightLeft } from "react-icons/hi2"

const CurrencyConvertor = () => {
    const[currencies,setCurrencies]=useState([])
    const[amount,setAmount]=useState(1)
    const[fromCurrency,setFromCurrency]=useState('USD')
    const[toCurrency,setToCurrency]=useState('INR')
    const[convertedammount,setConvertedAmount]=useState(null)
    const[converting,setConverting]=useState(null)
    const[favorite,setFovrite]=useState(JSON.parse(localStorage.getItem("favorites"))||["INR","USD"]);
    //Currencies-> 'https://api.frankfurter.app/currencies';
    //Currencies-> 'https://api.frankfurter.app/latest?amount=1&from=USD&to=INR';
    const fetchCurrencies =async()=>{
        try{
         const res=await fetch("https://api.frankfurter.app/currencies")
         const data=await res.json()
         setCurrencies(Object.keys(data))
        }catch(e){
     console.error("error fetching",error)
        }
    }
    useEffect(()=>{
        fetchCurrencies()
    },[])
    
 
 console.log(currencies)
 const convertCurrency=async()=>{
//Conversion Logic
if(!amount)return setConverting(true)
try{
    const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    const data=await res.json()
    setConvertedAmount(data.rates[toCurrency]+" "+toCurrency)
   }catch(e){
console.error("error fetching",error)
   }finally{setConverting(false)}
 }
 const handleFavorit=(currency)=>{
 //add to fav
 let updatefavorite=[...favorite]
 if(favorite.includes(currency))
    {
        updatefavorite=updatefavorite.filter(fav=>fav!==currency)
    }else{
        updatefavorite.push(currency)
    }
    setFovrite(updatefavorite)
    localStorage.setItem('favorites',JSON.stringify(updatefavorite))
 }
 const swapCurrencies=()=>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
 }



  return <div className="max-w-auto mx-auto  my-10 p-5 bg-white rounded-lg shadow-md">
    <h1 className="mb-5 text-2xl font-semibold text-gray-700"> Currency Convertor</h1>
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown favorite={favorite} currencies={currencies} handleFavorit={handleFavorit} setCurrency={setFromCurrency} currency={fromCurrency} title="From:"/>
    {/*swap currenciesbutton*/}
    <div className="flex justify-center -mb-5 sm:mb-0">
        <button onClick={swapCurrencies} className=" p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 border-hidden"><HiArrowsRightLeft className=" text-xl text-gray-700"/></button>
    </div>
    <CurrencyDropdown favorite={favorite} currencies={currencies} handleFavorit={handleFavorit} setCurrency={setToCurrency} currency={toCurrency} title="To:"/>
    </div>
    <div className="mt-4 mr-3 ">
        <label htmlFor="amount"
        className="block text-sm font-medium text-gray-700"
        
        >Amount:
        </label>
        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}
        className=" w-full mr-10 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1" 
        />
        <div className="flex justify-end mt-6">
            <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting? 'animate-pulse': '' }`}>
                Convert
                </button>
        </div>
        {convertedammount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
            Conveted Currencies:{convertedammount}
        </div>
        )}
    </div>
  </div>
    
  
}

export default CurrencyConvertor



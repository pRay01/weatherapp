//@ts-nocheck 
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'


const api ={
  key:"ecf17666cc30f448b291b0714a7cfc2a",
  base:"https://api.openweathermap.org/data/2.5/"
}


function Home(){

  const [query, setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt =>{
    if(evt.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(res => res.json())
       .then(result => {
         setWeather(result);
         setQuery('');
         console.log(result);
      });
    }
  }

  const dateBuilder=(d)=>{
      let months = ["January","February","March","April","May","June","July","August","September","October","Novembber","December"];
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     
      let day = days[d.getDay()];
      console.log(d.getDay(),"today-day")
      console.log(days[d.getDay()])
      let date =d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      
      return `${day} ${date} ${month} ${year}`
  }

  return (
     <div className=
     {(typeof weather?.main != "undefinned") 
       ? ((weather?.main?.temp > 16) 
          ? 'app warm' 
           : 'app') 
           :  'app'}>
        <main>
            <div className='search-box'>
                <input
                  type="text" 
                  className='search-bar'
                  placeholder='Search...'
                  onChange={e =>setQuery(e.target.value)}
                  valu={query}
                  onKeyPress={search}
                  />
            </div>
            {(typeof weather.main != "undefined") ? (  
            <div className='location-box'>
                <div className='location'>
                 {weather.name},{weather.sys.country}
                </div>
                <div className='date'>
                   {dateBuilder(new Date())}  
                 </div>  
                 <div className='weather-box'>
                    <div className='temp'>
                      {Math.round(weather.main.temp)}°c
                    </div>
                    <div className='weather'>
                        {weather.weather[(0).main]}
                    </div>
                </div> 
             </div> 
            ) : ('')}
        </main>
     </div>
  )
}

export default Home

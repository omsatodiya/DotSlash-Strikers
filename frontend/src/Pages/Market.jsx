import React from 'react'
import ItemCard from '../Components/itemCards'
import { useState, useEffect } from 'react';

const Market = () => {

    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      fetch("http://localhost:5500/api/item")
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response wasn't ok")
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setItemData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }, []);
  
    if(loading) {
      return <>
      loading
      </>
    }
  
    if(error) {
      return <>
      loading
      </>
    }

    return (
        
        <>
        {console.log(itemData)}
            <div className="h-[72px]"></div> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
  {itemData.map(item => (
    <ItemCard key={item._id} item={item} />
  ))}
</div>
        </>
    )
}

export default Market


import React from 'react'
import ItemCard from '../Components/itemCards'
const Market = () => {
    const items = [{
        imageUrl: "https://picsum.photos/200/300",
        id:1243,
        name: "Medical Equipment Name",
        quantity: 100,
        price: 1000,
        expiryDate: "2024-12-31",
        hospitalName: "City General Hospital",
        description: "Detailed description of the medical equipment or medicine..."
    } ,
    {
        imageUrl: "https://picsum.photos/200/300",
        name: "Medical Equipment Name",
        id: 2432,
        quantity: 100,
        price: 1000,
        expiryDate: "2024-12-31",
        hospitalName: "City General Hospital",
        description: "lorem Detailed description of the medical equipment or medicine..."
    }
    ]
    return (
        <>
            <div className="h-[72px]"></div> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
  {items.map(item => (
    <ItemCard key={item._id} item={item} />
  ))}
</div>
        </>
    )
}

export default Market

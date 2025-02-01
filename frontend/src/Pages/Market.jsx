import React from 'react'
import ItemCard from '../Components/itemCards'
const Market = () => {
    const items = [{
        imageUrl: "https://picsum.photos/200/300",
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
        </>
    )
}

export default Market

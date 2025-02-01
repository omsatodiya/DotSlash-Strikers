import React from 'react'

const MarketSidebar = () => {
    return (
        <div className="lg:w-64 lg:h-[calc(100vh-72px)] lg:fixed lg:top-[72px] lg:left-0 lg:border-r lg:border-gray-200 bg-white w-full sticky top-[72px] z-10">
            <div className="flex lg:flex-col lg:p-4 p-2 overflow-x-auto lg:overflow-y-auto gap-4 items-center lg:items-stretch">
                {/* Search Bar */}
                <div className="lg:mb-6 min-w-[200px] lg:min-w-0 flex-1 lg:flex-none">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Filter Section */}
                <div className="lg:mb-6 min-w-[150px] lg:min-w-0 flex-1 lg:flex-none">
                    <h3 className="font-semibold mb-2 hidden lg:block">Filter By</h3>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Category</option>
                        <option value="equipment">Equipment</option>
                        <option value="medicine">Medicine</option>
                        <option value="supplies">Supplies</option>
                    </select>
                </div>

                {/* Sort Section */}
                <div className="lg:mb-6 min-w-[150px] lg:min-w-0 flex-1 lg:flex-none">
                    <h3 className="font-semibold mb-2 hidden lg:block">Sort By</h3>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="date">Date Added</option>
                    </select>
                </div>

                {/* Sell Button */}
                <div className="min-w-[150px] lg:min-w-0 flex-1 lg:flex-none">
                    <button className="w-full bg-blue-600 text-white py-2 lg:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Sell a Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MarketSidebar
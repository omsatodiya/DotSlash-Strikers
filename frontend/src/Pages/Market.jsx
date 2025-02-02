import React from 'react';
import ItemCard from '../Components/itemCards';
import { useState, useEffect } from 'react';

const Market = () => {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('price-asc');

    // Fetch data from API with search query
    useEffect(() => {
        const fetchItems = async () => {
            try {
                let url = 'http://localhost:5000/api/item';
                if (searchQuery) {
                    url += `/search?query=${encodeURIComponent(searchQuery)}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItemData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Add debounce to prevent too many API calls
        const timeoutId = setTimeout(() => {
            fetchItems();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Handle filter change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Handle search change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle sort change
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Get unique categories from itemData
    const getUniqueCategories = () => {
        const categories = [...new Set(itemData.map(item => item.category))];
        return categories;
    };

    // Filter and sort function
    const getFilteredAndSortedItems = () => {
        let filteredItems = [...itemData];

        // Filter by category
        if (filter) {
            filteredItems = filteredItems.filter(item => item.category === filter);
        }

        // Sort items
        switch (sortOrder) {
            case 'price-asc':
                filteredItems.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredItems.sort((a, b) => b.price - a.price);
                break;
            case 'date':
                filteredItems.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            default:
                break;
        }

        return filteredItems;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Sidebar with Filter Options */}
            <div className="lg:w-64 lg:h-[calc(100vh-72px)] lg:fixed lg:top-[72px] lg:left-0 lg:border-r lg:border-gray-200 bg-white w-full sticky top-[72px] z-10">
                <div className="flex lg:flex-col lg:p-4 p-2 overflow-x-auto lg:overflow-y-auto gap-4 items-center lg:items-stretch">
                    {/* Search Bar */}
                    <div className="lg:mb-6 min-w-[200px] lg:min-w-0 flex-1 lg:flex-none">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="lg:mb-6 min-w-[150px] lg:min-w-0 flex-1 lg:flex-none">
                        <h3 className="font-semibold mb-2 hidden lg:block">Filter By</h3>
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Categories</option>
                            {getUniqueCategories().map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="lg:mb-6 min-w-[150px] lg:min-w-0 flex-1 lg:flex-none">
                        <h3 className="font-semibold mb-2 hidden lg:block">Sort By</h3>
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
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

            {/* Main Content */}
            <div className="lg:ml-64 flex-1">
                <div className="h-[72px]"></div>
                <div className="flex flex-wrap justify-center gap-4 p-4">
                    {getFilteredAndSortedItems().map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Market;
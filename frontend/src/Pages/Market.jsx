import React, { useState } from 'react';
import ItemCard from '../Components/itemCards';

// Dummy item data (based on your schema)
const dummyItems = [
  {
    _id: "1",
    name: "Surgical Gloves",
    quantity: 100,
    expiryDate: new Date("2025-12-01"),
    category: "protective gear",
    hospitalId: "HOSP001",
    status: "available",
    price: 50,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    name: "IV Fluid Pack",
    quantity: 50,
    expiryDate: new Date("2026-03-10"),
    category: "fluid",
    hospitalId: "HOSP002",
    status: "available",
    price: 100,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-03-12"),
  },
  {
    _id: "3",
    name: "Syringes",
    quantity: 500,
    expiryDate: new Date("2025-06-15"),
    category: "injection",
    hospitalId: "HOSP003",
    status: "available",
    price: 5,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-05-20"),
  },
  {
    _id: "4",
    name: "Bandages",
    quantity: 200,
    expiryDate: new Date("2027-01-01"),
    category: "wound care",
    hospitalId: "HOSP004",
    status: "available",
    price: 15,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-02-10"),
  },
  {
    _id: "5",
    name: "N95 Masks",
    quantity: 300,
    expiryDate: new Date("2025-08-10"),
    category: "protective gear",
    hospitalId: "HOSP005",
    status: "available",
    price: 20,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-04-05"),
  },
  {
    _id: "6",
    name: "Thermometer",
    quantity: 50,
    expiryDate: new Date("2030-01-01"),
    category: "equipment",
    hospitalId: "HOSP006",
    status: "available",
    price: 150,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-01-30"),
  },
  {
    _id: "7",
    name: "Stethoscope",
    quantity: 20,
    expiryDate: new Date("2030-01-01"),
    category: "equipment",
    hospitalId: "HOSP007",
    status: "available",
    price: 500,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-03-01"),
  },
  {
    _id: "8",
    name: "Hand Sanitizer (1L)",
    quantity: 120,
    expiryDate: new Date("2025-09-20"),
    category: "hygiene",
    hospitalId: "HOSP008",
    status: "available",
    price: 80,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-06-01"),
  },
  {
    _id: "9",
    name: "Oximeter",
    quantity: 30,
    expiryDate: new Date("2030-01-01"),
    category: "equipment",
    hospitalId: "HOSP009",
    status: "available",
    price: 700,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-02-15"),
  },
  {
    _id: "10",
    name: "Gauze Rolls",
    quantity: 400,
    expiryDate: new Date("2027-04-01"),
    category: "wound care",
    hospitalId: "HOSP010",
    status: "available",
    price: 10,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-05-10"),
  },
  {
    _id: "11",
    name: "Ventilator Tubes",
    quantity: 15,
    expiryDate: new Date("2028-11-30"),
    category: "equipment",
    hospitalId: "HOSP011",
    status: "available",
    price: 1200,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-04-25"),
  },
  {
    _id: "12",
    name: "Blood Pressure Monitor",
    quantity: 25,
    expiryDate: new Date("2030-01-01"),
    category: "equipment",
    hospitalId: "HOSP012",
    status: "available",
    price: 950,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-07-01"),
  },
  {
    _id: "13",
    name: "Disposable Aprons",
    quantity: 300,
    expiryDate: new Date("2026-02-01"),
    category: "protective gear",
    hospitalId: "HOSP013",
    status: "available",
    price: 25,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-01-10"),
  },
  {
    _id: "14",
    name: "Antiseptic Solution",
    quantity: 100,
    expiryDate: new Date("2025-10-01"),
    category: "hygiene",
    hospitalId: "HOSP014",
    status: "available",
    price: 45,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-03-15"),
  },
  {
    _id: "15",
    name: "Wheelchair",
    quantity: 5,
    expiryDate: new Date("2035-01-01"),
    category: "equipment",
    hospitalId: "HOSP015",
    status: "available",
    price: 5000,
    imageURL: "https://via.placeholder.com/150",
    createdAt: new Date("2024-06-15"),
  },
];

const Market = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('price-asc');

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSortChange = (event) => setSortOrder(event.target.value);

  const getUniqueCategories = () => {
    return [...new Set(dummyItems.map(item => item.category))];
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = [...dummyItems];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    }

    if (filter) {
      filteredItems = filteredItems.filter(item => item.category === filter);
    }

    switch (sortOrder) {
      case 'price-asc':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filteredItems;
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="lg:w-64 lg:h-[calc(100vh-72px)] lg:fixed lg:top-[72px] lg:left-0 lg:border-r lg:border-gray-200 bg-white w-full sticky top-[72px] z-10">
        <div className="flex lg:flex-col lg:p-4 p-2 overflow-x-auto lg:overflow-y-auto gap-4 items-center lg:items-stretch">
          {/* Search */}
          <div className="lg:mb-6 min-w-[200px] lg:min-w-0 flex-1 lg:flex-none">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
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

          {/* Sort */}
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
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;

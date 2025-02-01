import React from 'react';
import { Search, Filter, SortDesc, PlusCircle } from 'lucide-react';

const Sidebar = ({ onSearch, onFilter, onSort }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 h-fit sticky top-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter Dropdown */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sky-900 font-medium">
          <Filter className="h-4 w-4" />
          Filter by
        </label>
        <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
          <option value="">All Categories</option>
          <option value="medicine">Medicine</option>
          <option value="equipment">Equipment</option>
          <option value="supplies">Supplies</option>
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sky-900 font-medium">
          <SortDesc className="h-4 w-4" />
          Sort by
        </label>
        <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="quantity">Quantity Available</option>
          <option value="expiry">Expiry Date</option>
        </select>
      </div>

      {/* Sell Item Button */}
      <button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        <PlusCircle className="h-5 w-5" />
        Sell Item
      </button>
    </div>
  );
};

export default Sidebar;
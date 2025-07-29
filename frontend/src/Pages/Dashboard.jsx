import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  PackagePlus,
  ShoppingCart,
  Activity,
  Package,
} from "lucide-react";

const mockHospitalData = {
  _id: "12345",
  name: "City Health Hospital",
  email: "info@cityhealth.org",
  contact: "+91-9876543210",
  location: {
    coordinates: [77.5946, 12.9716],
  },
  createdAt: "2022-01-15T10:30:00Z",
};

const dummyItems = Array.from({ length: 15 }, (_, i) => ({
  _id: `${i + 1}`,
  name: `Item ${i + 1}`,
  quantity: Math.floor(Math.random() * 50) + 1,
  expiryDate: new Date(Date.now() + Math.random() * 1e10).toISOString(),
  category: ["medicine", "equipment", "supply"][i % 3],
  status: ["available", "used", "expired"][i % 3],
  price: Math.floor(Math.random() * 500) + 50,
}));

function Dashboard() {
  const hospitalData = mockHospitalData;
  const myItems = dummyItems;

  const formatLocation = (location) => {
    if (location?.coordinates) {
      return `${location.coordinates[1]}, ${location.coordinates[0]}`;
    }
    return "Location not available";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between mt-14">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Welcome back, {hospitalData.name}
              </h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  Hospital Dashboard
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {new Date(hospitalData.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/add-item"
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-md p-3">
                  <PackagePlus className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">Add Item</p>
                  <p className="text-sm text-gray-500">Add new medical supplies</p>
                </div>
              </div>
            </Link>

            <Link
              to="/market"
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex items-center">
                <div className="bg-green-500 rounded-md p-3">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">Market</p>
                  <p className="text-sm text-gray-500">Browse available items</p>
                </div>
              </div>
            </Link>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-purple-500 rounded-md p-3">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">Total Items</p>
                  <p className="text-sm text-gray-500">{myItems.length} items listed</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-yellow-500 rounded-md p-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">Status</p>
                  <p className="text-sm text-gray-500">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Info */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Information</h3>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem icon={<Building2 />} label="Hospital Name" value={hospitalData.name} />
              <InfoItem icon={<Mail />} label="Email Address" value={hospitalData.email} />
              <InfoItem icon={<Phone />} label="Contact Number" value={hospitalData.contact} />
              <InfoItem
                icon={<MapPin />}
                label="Location"
                value={formatLocation(hospitalData.location)}
              />
              <InfoItem
                icon={<Clock />}
                label="Member Since"
                value={new Date(hospitalData.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        </div>

        {/* Listed Items */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My Listed Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{item.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium capitalize">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry:</span>
                    <span className="font-medium">
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 text-gray-400 mt-1">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default Dashboard;

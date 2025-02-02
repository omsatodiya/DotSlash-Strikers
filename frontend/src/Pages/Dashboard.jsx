import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  PackagePlus,
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

function Dashboard() {
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch hospital data
    const fetchHospitalData = async () => {
      try {
        const response = await fetch("/api/hospital/");
        const data = await response.json();
        setHospitalData(data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6  bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-600">Welcome back, {hospitalData?.name}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <Link
          to="/add-item"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PackagePlus size={18} /> Add New Item
        </Link>
        <Link
          to="/buy-item"
          className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <ShoppingCart size={18} /> Buy Items
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center gap-4">
          <Building2 className="text-blue-600" size={24} />
          <div>
            <p className="text-gray-500">Hospital Name</p>
            <h3 className="text-lg font-semibold">{hospitalData?.name}</h3>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center gap-4">
          <MapPin className="text-green-600" size={24} />
          <div>
            <p className="text-gray-500">Location</p>
            <h3 className="text-lg font-semibold">
              {`${hospitalData?.location?.coordinates[1]}, ${hospitalData?.location?.coordinates[0]}`}
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center gap-4">
          <Phone className="text-orange-600" size={24} />
          <div>
            <p className="text-gray-500">Contact</p>
            <h3 className="text-lg font-semibold">{hospitalData?.contact}</h3>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-500" size={18} />
            <span>{hospitalData?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-gray-500" size={18} />
            <span>{hospitalData?.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-gray-500" size={18} />
            <span>
              Member since:{" "}
              {new Date(hospitalData?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

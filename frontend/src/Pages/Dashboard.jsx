  import React, { useState, useEffect } from "react";
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
    Users,
    TrendingUp,
  } from "lucide-react";
  import EditItemModal from "../Components/EditItemModal";
  import toast, { Toaster } from "react-hot-toast";

  function Dashboard() {
    const [hospitalData, setHospitalData] = useState(null);
    const [myItems, setMyItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fetch hospital data
    useEffect(() => {
      fetch("http://localhost:5000/api/hospital/688476eb0bbfcff41fa4f8b7")
        .then((response) => response.json())
        .then((response) => {
          console.log("Fetched hospital data:", response);
          setHospitalData(response.data);
        })
        .catch((error) => console.error("Error fetching hospital data:", error));
    }, []);

    // Fetch hospital's items
    useEffect(() => {
      if (hospitalData?._id) {
        fetch("http://localhost:5000/api/item")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched all items:", data);
            const hospitalItems = data.filter((item) => {
    if (!item.hospitalId) return false; // skip if null or undefined
    const itemHospitalId = typeof item.hospitalId === "object" ? item.hospitalId._id : item.hospitalId;
    return itemHospitalId === hospitalData._id;
  });

            console.log("Filtered hospital items:", hospitalItems);
            setMyItems(hospitalItems);
          })
          .catch((error) => console.error("Error fetching items:", error));
      }
    }, [hospitalData]);

    const handleDeleteItem = async (itemId) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/item/${itemId}`,
            {
              method: "DELETE",
              headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hospitalId: hospitalData._id, // send hospitalId in body
          }),
            }
          );

          if (response.ok) {
            setMyItems(myItems.filter((item) => item._id !== itemId));
            toast.success("Item deleted successfully");
          } else {
            throw new Error("Failed to delete item");
          }
        } catch (error) {
          toast.error("Error deleting item");
          console.error("Error:", error);
        }
      }
    };

    const handleEditClick = (item) => {
      setSelectedItem(item);
      setIsEditModalOpen(true);
    };

    const handleUpdateItem = async (updatedItemData) => {
      try {
        const itemToUpdate = {
          ...updatedItemData,
          hospitalId: hospitalData._id,
        };

        const response = await fetch(
          `http://localhost:5000/api/item/${selectedItem._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemToUpdate),
          }
        );

        if (response.ok) {
          const updatedItem = await response.json();
          setMyItems(
            myItems.map((item) =>
              item._id === selectedItem._id ? updatedItem : item
            )
          );
          setIsEditModalOpen(false);
          toast.success("Item updated successfully");
        } else {
          throw new Error("Failed to update item");
        }
      } catch (error) {
        toast.error("Error updating item");
        console.error("Error:", error);
      }
    };

    if (!hospitalData) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    const formatLocation = (location) => {
      if (location?.coordinates) {
        return `${location.coordinates[1]}, ${location.coordinates[0]}`;
      }
      return "Location not available";
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />

        {/* Top Stats Section */}
        <div className="bg-white shadow-sm ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
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
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
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
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition-shadow duration-300 ease-in-out"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Market</p>
                    <p className="text-sm text-gray-500">Browse available items</p>
                  </div>
                </div>
              </Link>

              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Total Items</p>
                    <p className="text-sm text-gray-500">{myItems.length} items listed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
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

          {/* Hospital Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hospital Information</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Building2 className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Hospital Name</p>
                      <p className="mt-1 text-sm text-gray-900">{hospitalData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="mt-1 text-sm text-gray-900">{hospitalData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contact Number</p>
                      <p className="mt-1 text-sm text-gray-900">{hospitalData.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatLocation(hospitalData.location)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(hospitalData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Listed Items */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Listed Items</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">₹{item.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">{item.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry:</span>
                        <span className="font-medium">
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <EditItemModal
            item={selectedItem}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleUpdateItem}
          />
        )}
      </div>
    );
  }

  export default Dashboard;
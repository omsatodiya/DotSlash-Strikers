import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { MapPin, Loader2, AlertCircle, Building2 } from "lucide-react";

export default function HospitalRegistrationForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    location: {
      type: "Point",
      coordinates: [0, 0], // [longitude, latitude]
    },
  });

  // Get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Failed to get location. Please enter coordinates manually."
          );
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "longitude" || name === "latitude") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates:
            name === "longitude"
              ? [parseFloat(value), prev.location.coordinates[1]]
              : [prev.location.coordinates[0], parseFloat(value)],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/hospital/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getToken()}`,
        },
        body: JSON.stringify({
          ...formData,
          hospitalid: user.id, // Using Clerk user ID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Building2 className="mx-auto h-12 w-12 text-blue-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your Hospital
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {locationLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span className="ml-2">Get Current Location</span>
                </button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    required
                    value={formData.location.coordinates[0]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    required
                    value={formData.location.coordinates[1]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Register Hospital"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

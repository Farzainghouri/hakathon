import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const ProfileScreen = () => {
  const [data, setData] = useState([]); // Holds the fetched loan applications
  const [loading, setLoading] = useState(true); // Handles loading state
  const [error, setError] = useState(""); // Handles errors

  const db = getFirestore();

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "loanApplications"));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArray);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Loan Applications
        </h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-gray-700 text-center">No loan applications found.</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg bg-gray-50">
                <p>
                  <strong>Amount:</strong> {item.amount || "N/A"}
                </p>
                <p>
                  <strong>Initial Payment:</strong> {item.initialPayment || "N/A"}
                </p>
                <p>
                  <strong>Purpose:</strong> {item.purpose || "N/A"}
                </p>
                <p>
                  <strong>time:</strong> {item.time || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Button to trigger data refresh */}
        {!loading && !error && (
          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => fetchData()}
          >
            Refresh Data
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;

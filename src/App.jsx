import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (gender = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://randomuser.me/api/${gender ? `?gender=${gender}` : ""}`;
      const response = await axios.get(url);
      setUser(response.data.results[0]);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900">

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <TbLoader2 size={60} className="animate-spin text-red-900" />
        </div>
      )}


      {!loading && (
        <div className="flex flex-row items-center justify-center w-full h-full gap-9">

          <div className="bg-slate-100 rounded-xl shadow-lg p-8 w-[35%]  h-[28%] flex gap-6  items-center">
            {user ? (
              <>
                <img src={user.picture.large} alt="User" className="w-[15%] h-[49%] rounded-full mt-2 flex self-start" />
                <div className="flex flex-col justify-center ">
                  <h2 className="text-xl font-bold">
                    {user.name.title} {user.name.first} {user.name.last}
                  </h2>
                  <p className="text-gray-600 text-base">
                    📅 {new Date(user.dob.date).toLocaleDateString()} (
                    {user.dob.age} years old)
                  </p>
                  <p className="text-gray-600 text-base flex items-center gap-2">
                    <IoMail /> {user.email}
                  </p>
                  <p className="text-gray-600 text-base flex items-center gap-2">
                    <FaPhoneFlip size={15} /> <span>{user.phone}</span>
                  </p>
                  <p className="text-gray-600 text-base flex items-center gap-2">
                    <IoIosGlobe size={18} /> <span>{user.location.country}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-red-500">{error}</p>
            )}
          </div>


          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => fetchData()}
              className="bg-red-900 text-white p-3 rounded-full shadow w-11 h-11 flex items-center justify-center"
            >
              <FaRandom size={20} />
            </button>

            <button
              onClick={() => fetchData("female")}
              className="bg-red-900 text-white p-3 rounded-full shadow w-11 h-11 flex items-center justify-center"
            >
              <IoMdFemale size={20} />
            </button>

            <button
              onClick={() => fetchData("male")}
              className="bg-red-900 text-white p-3 rounded-full shadow w-11 h-11 flex items-center justify-center"
            >
              <IoMdMale size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

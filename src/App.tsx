import { useState } from "react";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";

const App = () => {
  const [apiKey, setApiKey] = useState<string>("");
  interface CustomField {
    customFieldId: string;
    name: string;
    type: string;
    fieldType: string;
    valueType: string;
  }

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [error, setError] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fetchCustomFields = async () => {
    if (!apiKey) {
      setError("API key is required.");
      return;
    }

    setError("");
    try {
      const response = await axios.get("https://api.getresponse.com/v3/custom-fields", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });
      setCustomFields(response.data);
    } catch (err) {
      setError("Failed to fetch custom fields. Please check your API key.");
      console.error(err);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">GetResponse Custom Fields</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-800 text-yellow-300">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </header>
      <div className="mb-6">
        <input
          type="text"
          className="w-full p-3 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter your API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button
          onClick={fetchCustomFields}
          className="mt-3 w-full p-3 bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
        >
          Fetch Custom Fields
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {customFields.length > 0 ? (
        <table className="w-full border-collapse bg-gray-800 text-left rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4 border-b border-gray-600">ID</th>
              <th className="p-4 border-b border-gray-600">Name</th>
              <th className="p-4 border-b border-gray-600">Type</th>
              <th className="p-4 border-b border-gray-600">Field Type</th>
              <th className="p-4 border-b border-gray-600">Value Type</th>
            </tr>
          </thead>
          <tbody>
            {customFields.map((field) => (
              <tr key={field.customFieldId} className="hover:bg-gray-700">
                <td className="p-4 border-b border-gray-600">{field.customFieldId}</td>
                <td className="p-4 border-b border-gray-600">{field.name}</td>
                <td className="p-4 border-b border-gray-600">{field.type}</td>
                <td className="p-4 border-b border-gray-600">{field.fieldType}</td>
                <td className="p-4 border-b border-gray-600">{field.valueType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-400">No custom fields found. Enter a valid API key to fetch data.</p>
      )}
    </div>
  );
};

export default App;

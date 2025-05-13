import React, { useState } from "react";
import { Search, ChevronDown, UserPlus } from "lucide-react";

function SearchFilterBar({
  filter,
  setFilter,
  selectedCourse,
  setSelectedCourse,
  courses,
  setShowAddForm,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Search and filter */}
      <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedCourse || "Filter by course"}
            <ChevronDown size={16} className="ml-2" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <ul>
                <li
                  onClick={() => {
                    setSelectedCourse("");
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  All Courses
                </li>
                {courses.map((course) => (
                  <li
                    key={course}
                    onClick={() => {
                      setSelectedCourse(course);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setShowAddForm(true)}
        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        <UserPlus size={18} className="mr-2" /> Add Student
      </button>
    </div>
  );
}

export default SearchFilterBar;

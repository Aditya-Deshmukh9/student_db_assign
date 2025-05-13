import React from "react";

function StudentForm({
  showAddForm,
  setShowAddForm,
  formData,
  handleInputChange,
  handleSubmit,
  formErrors,
}) {
  if (!showAddForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Student name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="student@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  formErrors.course ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Course name"
              />
              {formErrors.course && (
                <p className="text-red-500 text-sm mt-1">{formErrors.course}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Grade</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  formErrors.grade ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Current grade"
              />
              {formErrors.grade && (
                <p className="text-red-500 text-sm mt-1">{formErrors.grade}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Enrollment Date
              </label>
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg ${
                  formErrors.enrollmentDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formErrors.enrollmentDate && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.enrollmentDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {formData.id ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;

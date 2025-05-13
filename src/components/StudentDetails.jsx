import React from "react";

function StudentDetails({ selectedStudent, setSelectedStudent }) {
  if (!selectedStudent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Student Details</h2>
        <div className="space-y-3">
          <div>
            <span className="text-gray-500">Name:</span>
            <p className="font-medium">{selectedStudent.name}</p>
          </div>
          <div>
            <span className="text-gray-500">Email:</span>
            <p className="font-medium">{selectedStudent.email}</p>
          </div>
          <div>
            <span className="text-gray-500">Course:</span>
            <p className="font-medium">{selectedStudent.course}</p>
          </div>
          <div>
            <span className="text-gray-500">Grade:</span>
            <p className="font-medium">{selectedStudent.grade}</p>
          </div>
          <div>
            <span className="text-gray-500">Enrollment Date:</span>
            <p className="font-medium">{selectedStudent.enrollmentDate}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setSelectedStudent(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;

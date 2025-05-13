import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchFilterBar from "./components/SearchFilterBar";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./context/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./utils/firebase";

function App() {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    grade: "",
    enrollmentDate: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Get unique courses for filter dropdown
  const courses = [...new Set(students.map((student) => student.course))];

  // Fetch students from Firestore on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(studentsData);

        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.course.trim()) errors.course = "Course is required";
    if (!formData.grade.trim()) errors.grade = "Grade is required";
    if (!formData.enrollmentDate.trim())
      errors.enrollmentDate = "Enrollment date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setShowAddForm(false);
      setShowLoginForm(true);
      return;
    }

    if (validateForm()) {
      try {
        if (formData.id) {
          // Update existing student in Firestore
          const studentRef = doc(db, "students", formData.id);
          console.log(studentRef);

          const studentData = { ...formData };
          delete studentData.id; // Remove id field before updating

          await updateDoc(studentRef, studentData);

          // Update student in local state
          setStudents(
            students.map((student) =>
              student.id === formData.id ? { ...formData } : student
            )
          );
        } else {
          // Add new student to Firestore
          const newStudentRef = await addDoc(collection(db, "students"), {
            name: formData.name,
            email: formData.email,
            course: formData.course,
            grade: formData.grade,
            enrollmentDate: formData.enrollmentDate,
            createdBy: currentUser.uid,
            createdAt: new Date().toISOString(),
          });
          console.log(newStudentRef);

          // Add new student to local state
          const newStudent = {
            id: newStudentRef.id,
            name: formData.name,
            email: formData.email,
            course: formData.course,
            grade: formData.grade,
            enrollmentDate: formData.enrollmentDate,
            createdBy: currentUser.uid,
            createdAt: new Date().toISOString(),
          };

          setStudents([...students, newStudent]);
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          course: "",
          grade: "",
          enrollmentDate: "",
        });
        setShowAddForm(false);
      } catch (error) {
        console.error("Error saving student:", error);
        alert("Error saving student. Please try again.");
      }
    }
  };

  // Filter students based on search and course filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(filter.toLowerCase()) ||
      student.email.toLowerCase().includes(filter.toLowerCase());
    const matchesCourse = selectedCourse
      ? student.course === selectedCourse
      : true;
    return matchesSearch && matchesCourse;
  });

  // Select student to view details
  const viewStudentDetails = (student) => {
    if (currentUser) {
      setSelectedStudent(student);
    } else {
      setShowLoginForm(true);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "students", id));

      // Delete from local state
      setStudents(students.filter((student) => student.id !== id));

      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setShowLoginForm={setShowLoginForm} />

      <main className="container mx-auto px-4 py-8">
        <SearchFilterBar
          filter={filter}
          setFilter={setFilter}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courses={courses}
          setShowAddForm={setShowAddForm}
        />

        <StudentList
          loading={loading}
          filteredStudents={filteredStudents}
          viewStudentDetails={viewStudentDetails}
          deleteStudent={deleteStudent}
          isLoggedIn={!!currentUser}
          setFormData={setFormData}
          setShowAddForm={setShowAddForm}
          setShowLoginForm={setShowLoginForm}
        />
      </main>

      <StudentDetails
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      <StudentForm
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
      />

      <LoginForm
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
    </div>
  );
}

export default App;

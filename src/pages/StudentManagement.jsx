import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, X, ArrowLeft, Users, Home, LayoutGrid, User, Settings as SettingsIcon, ClipboardList, BarChart2 } from 'lucide-react';

const INITIAL_STUDENTS = [
    { id: 1, name: 'Pranav A', roll: '2025IT1070', department: 'IT', year: '1' },
    { id: 2, name: 'Modhini V', roll: '2025IT1089', department: 'IT', year: '1' },
    { id: 3, name: 'Rishe S', roll: '2025IT1030', department: 'IT', year: '1' },
    { id: 4, name: 'Shivvani T', roll: '2025IT0186', department: 'IT', year: '1' },
    { id: 5, name: 'Suresh Krishna G', roll: '2025IT0130', department: 'IT', year: '1' },
    { id: 6, name: 'Srivatsan S', roll: '2025IT1058', department: 'IT', year: '1' },
];

const StudentManagement = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState(INITIAL_STUDENTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const filteredStudents = students.filter(student => {
        if (!searchQuery) return true;
        const lowQuery = searchQuery.toLowerCase().trim();
        const matches = (
            student.name.toLowerCase().includes(lowQuery) ||
            student.roll.toLowerCase().includes(lowQuery) ||
            student.department.toLowerCase().includes(lowQuery)
        );
        console.log('Search:', lowQuery, '| Student:', student.name, '| Matches:', matches);
        return matches;
    });

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this student data?')) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newStudent = {
            id: currentStudent ? currentStudent.id : Date.now(),
            name: formData.get('name'),
            roll: formData.get('roll'),
            department: formData.get('department'),
            year: formData.get('year'),
        };

        if (currentStudent) {
            setStudents(students.map(s => s.id === currentStudent.id ? newStudent : s));
        } else {
            setStudents([...students, newStudent]);
        }
        closeModal();
    };

    const openModal = (student = null) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentStudent(null);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 pb-24">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                            <Users size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Student Management</h1>
                            <p className="text-gray-400">Add, edit, or remove student recognition data</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-black hover:bg-gray-900 text-white border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                    style={{ backgroundColor: '#000000', color: '#ffffff' }}
                >
                    <Plus size={20} />
                    Add Student
                </button>
            </div>

            <div className="glass-panel p-6 border-white/5 bg-black/40">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Type name, roll number or department..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#ffffff' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                                title="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-500 text-sm uppercase tracking-wider">
                            <th className="py-2 px-6 font-medium">Name</th>
                            <th className="py-2 px-6 font-medium">Roll Number</th>
                            <th className="py-2 px-6 font-medium">Department</th>
                            <th className="py-2 px-6 font-medium text-center">Year</th>
                            <th className="py-2 px-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id} className="group hover:bg-white/5 transition-all duration-300">
                                    <td className="py-4 px-6 font-semibold text-white bg-white/5 rounded-l-xl group-hover:bg-white/10">{student.name}</td>
                                    <td className="py-4 px-6 text-gray-400 font-medium bg-white/5 group-hover:bg-white/10">{student.roll}</td>
                                    <td className="py-4 px-6 bg-white/5 group-hover:bg-white/10">
                                        <span className="text-emerald-400 font-bold">{student.department}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center font-black text-lg bg-white/5 group-hover:bg-white/10">{student.year}</td>
                                    <td className="py-4 px-6 text-right bg-white/5 rounded-r-xl group-hover:bg-white/10">
                                        <div className="flex justify-end gap-4">
                                            <button
                                                onClick={() => openModal(student)}
                                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="p-2 text-white/50 hover:text-white transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-12 text-center text-gray-500 bg-white/5 rounded-xl">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search size={32} className="opacity-20" />
                                        <p className="font-medium">No students found matching "{searchQuery}"</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-lg p-8 relative animate-fade-in-up">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">
                            {currentStudent ? 'Edit Student' : 'Add New Student'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input
                                    name="name"
                                    defaultValue={currentStudent?.name}
                                    type="text"
                                    className="input-field mb-0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Roll Number</label>
                                <input
                                    name="roll"
                                    defaultValue={currentStudent?.roll}
                                    type="text"
                                    className="input-field mb-0"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                                    <select name="department" defaultValue={currentStudent?.department} className="input-field mb-0">
                                        <option value="CSE">CSE</option>
                                        <option value="IT">IT</option>
                                        <option value="ECE">ECE</option>
                                        <option value="EEE">EEE</option>
                                        <option value="MECH">MECH</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                                    <select name="year" defaultValue={currentStudent?.year} className="input-field mb-0">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="btn btn-outline">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagement;

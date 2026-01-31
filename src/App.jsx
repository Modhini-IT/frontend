import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import LiveMonitor from './pages/LiveMonitor';
import Attendance from './pages/Attendance';
import Analytics from './pages/Analytics';
import StudentManagement from './pages/StudentManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import DashboardLayout from './components/DashboardLayout';
import ClickSpark from './components/ClickSpark';

function App() {
    return (
        <Router>
            <ClickSpark sparkColor="#00e6b8" sparkCount={8} sparkRadius={20}>
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/team" element={<Team />} />

                        {/* Dashboard Routes with Sidebar Layout */}
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="monitor" element={<LiveMonitor />} />
                            <Route path="attendance" element={<Attendance />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="students" element={<StudentManagement />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </div>
            </ClickSpark>
        </Router>
    );
}

export default App;

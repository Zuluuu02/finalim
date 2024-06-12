import React, { useEffect, useState } from 'react';
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const ManageUsers = ({ auth }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsersFromDatabase();
    }, []);

    const fetchUsersFromDatabase = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`/users/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            });

            if (response.status === 204) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete user, status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Users</h2>}
        >
            <Head title="Manage Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-left">Users List</h1>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">ID</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Name</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Email</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Created At</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="border-b border-gray-300 px-4 py-2 text-center">
                                            No users available
                                        </td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user.id}>
                                            <td className="border-b border-gray-300 px-4 py-2">{user.id}</td>
                                            <td className="border-b border-gray-300 px-4 py-2">{user.name}</td>
                                            <td className="border-b border-gray-300 px-4 py-2">{user.email}</td>
                                            <td className="border-b border-gray-300 px-4 py-2">{user.created_at}</td>
                                            <td className="border-b border-gray-300 px-4 py-2">
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
};

export default ManageUsers;

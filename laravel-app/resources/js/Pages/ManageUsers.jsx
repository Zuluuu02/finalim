import React, { useEffect, useState } from 'react';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from your database here
        fetchUsersFromDatabase();
    }, []);

    const fetchUsersFromDatabase = async () => {
        try {
            // Make a fetch request to your backend to get user data
            const response = await fetch('your_backend_api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data); // Assuming data is an array of user objects
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const deleteUser = id => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => user.id !== id);
            saveUsersToStorage(updatedUsers);
            return updatedUsers;
        });
    };

    const saveUsersToStorage = (usersToSave) => {
        // Implement your logic to save users to local storage if needed
        // localStorage.setItem('users', JSON.stringify(usersToSave));
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
                <div className="md:w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 mt-4 md:mt-0">
                    <h1 className="text-2xl font-bold mb-4 text-left">Users List</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">ID</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Name</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Email</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-gray-700">Role</th>
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
                                        <td className="border-b border-gray-300 px-4 py-2">{user.role}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                                                onClick={() => deleteUser(user.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
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
    );
}

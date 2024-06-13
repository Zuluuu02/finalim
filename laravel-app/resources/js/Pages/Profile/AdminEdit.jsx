import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import AdminDeleteUserForm from './Partials/AdminDeleteUserForm';
import AdminUpdatePasswordForm from './Partials/AdminUpdatePasswordForm';
import AdminUpdateProfileInformationForm from './Partials/AdminUpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function AdminEdit({ auth, mustVerifyEmail, status }) {
    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <AdminUpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <AdminUpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <AdminDeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}

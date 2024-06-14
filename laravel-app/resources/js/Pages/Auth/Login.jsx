import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className="relative w-full max-w-sm mx-auto bg-gray-100 p-8 rounded-md shadow-md">
                <div className="absolute top-4 right-4">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <button className="text-xl">&times;</button>
                    </Link>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <ApplicationLogo className="w-16 h-16 fill-current text-gray-500 mb-2" />
                    <h1 className="text-xl font-bold text-gray-700">Welcome to LeSunshine</h1>
                </div>

                <div className="mt-4">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Email"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <TextInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                        Remember me
                    </label>
                </div>

                <div className="flex justify-between items-center mb-4"> 
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <PrimaryButton className="w-full py-3 rounded-full text-center flex items-center justify-center bg-red-600 hover:bg-red-700 text-white" disabled={processing}>
                    Log in
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}

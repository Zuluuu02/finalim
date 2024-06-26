import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="relative w-full max-w-sm mx-auto bg-gray-100 p-8 rounded-md shadow-md">
                <div className="absolute top-4 right-4">
                    <Link href="/" className="text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <button type="button" className="text-xl">&times;</button>
                    </Link>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <ApplicationLogo className="w-16 h-16 fill-current text-gray-500 mb-2" />
                    <h1 className="text-xl font-bold text-gray-700">Create Your Account</h1>
                    <p className="text-sm text-gray-600">Find new ideas to try</p>
                </div>

                <div className="mt-4">
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Name"
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Email"
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative">
                    <TextInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
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

                <div className="mt-4">
                    <TextInput
                        id="password_confirmation"
                        type={showPassword ? 'text' : 'password'}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Confirm Password"
                        className="mt-1 block w-full bg-gray-200 rounded"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton type="submit" className="w-full py-3 rounded-full text-center flex items-center justify-center bg-red-600 hover:bg-red-700 text-white" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
            <p className="text-center text-zinc-500 text-sm mt-4">
                By continuing, you agree to LeSunshine's <Link href="#" className="text-blue-500">Terms of Service</Link> and acknowledge you've read our <Link href="#" className="text-blue-500">Privacy Policy</Link>.
            </p>
            <p className="text-center text-zinc-500 text-sm mt-4">
                Already a member? <Link href={route('login')} className="text-blue-500">Log in</Link>
            </p>
        </GuestLayout>
    );
}

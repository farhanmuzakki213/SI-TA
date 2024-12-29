import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { InputText } from "primereact/inputtext";
import { usePermission } from '@/Layouts/layout/composables/permission';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { props } = usePage();
    const { data_user } = props;
    const { hasRole } = usePermission();
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });
    console.log(data_user)
    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-4 space-y-6">
                <div className="mb-3">
                    <label htmlFor="name" className="block text-900 font-medium mb-2">Name</label>
                    <InputText
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.email} className="" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText
                        id="email"
                        type="text"
                        placeholder="Email address"
                        className="w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="" />
                </div>

                <div className="mb-3">
                    <label htmlFor="nim" className="block text-900 font-medium mb-2">NIM</label>
                    <InputText
                        disabled
                        id="nim"
                        type="text"
                        placeholder="NIM"
                        className="w-full"
                        value={data_user[0].nim_mahasiswa}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Prodi" className="block text-900 font-medium mb-2">Prodi</label>
                    <InputText
                        disabled
                        id="Prodi"
                        type="text"
                        placeholder="Prodi"
                        className="w-full"
                        value={data_user[0].prodi}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="block text-900 font-medium mb-2">Gender</label>
                    <InputText
                        disabled
                        id="gender"
                        type="text"
                        placeholder="Gender"
                        className="w-full"
                        value={data_user[0].gender}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="kelas" className="block text-900 font-medium mb-2">Kelas</label>
                    <InputText
                        disabled
                        id="kelas"
                        type="text"
                        placeholder="Kelas"
                        className="w-full"
                        value={data_user[0].kelas}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

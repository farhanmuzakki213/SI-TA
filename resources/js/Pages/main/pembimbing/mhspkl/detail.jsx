import { usePage } from '@inertiajs/react';
import React from 'react';
import Layout from '@/Layouts/layout/layout.jsx';
import { Image } from 'primereact/image';

const MhspklDetail = () => {
    const { props } = usePage();
    const { data_mhs, data_laporan, data_nilai } = props;

    return (
        <Layout>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:max-w-sm">
                    <div className="rounded-[12px] border bg-white px-4 pt-8 pb-10 shadow-lg">
                        <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt="Michael Simbal"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="text-center mt-4">
                            <h1 className="text-xl font-bold text-gray-900">Farhan Muzakki</h1>
                            <p className="text-sm text-gray-600">2211083025</p>
                            <p className="mt-2 text-sm text-gray-500">Web Developer</p>
                            <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                                <li className="flex items-center py-3 text-sm">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">Open for side gigs</span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3 text-sm">
                                    <span>Joined On</span>
                                    <span className="ml-auto">Apr 08, 2022</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:max-w-96">
                    <div className="grid gap-1">
                        <div className="col-12">
                            <div className='card'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className='card'>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default MhspklDetail;

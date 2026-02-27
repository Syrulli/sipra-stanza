'use client';

import { useState } from 'react';
import { CiShoppingCart, FiMenu, FiX, FiChevronDown, CiUser } from '@/components/icons/iconPacks';
import { Menu, Transition } from '@headlessui/react';
import { Navigation } from '@/app/constant/userNavbarConst';

export default function UserNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-20">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img
                            alt="Logo"
                            src="/logo.webp"
                            className="h-10 w-auto"
                        />
                    </a>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    {Navigation.map((item) => (
                        <Menu key={item.name} as="div" className="relative">
                            <Menu.Button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-indigo-500 transition outline-none">
                                {({ open }) => (
                                    <>
                                        {item.name}
                                        <FiChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : ''
                                                }`}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </Menu.Button>
                            <Transition
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-4 w-48 origin-top rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {item.children?.map((child) => (
                                            <Menu.Item key={child.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={child.href}
                                                        className={`${active ? 'bg-indigo-600 rounded-tr-xl rounded-bl-xl' : 'text-white'
                                                            } block px-4 py-2 text-sm`}
                                                    >
                                                        {child.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <a
                        href="/signin"
                        className="text-white hover:text-indigo-400 transition"
                    >
                        <CiUser className="h-6 w-6" />
                    </a>
                    <a
                        href="#"
                        className="text-white hover:text-indigo-400 transition relative"
                    >
                        <CiShoppingCart className="h-7 w-7" />
                        {/* <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span> */}
                    </a>
                </div>  

                <div className="flex lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="rounded-md p-2 text-gray-200 hover:bg-gray-800"
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm p-6 lg:hidden">
                    <div className="flex items-center justify-between mb-8">
                        <img
                            alt="Logo"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        />
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-md p-2 text-gray-200 hover:bg-gray-800"
                        >
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {Navigation.map((item) => (
                            <details key={item.name} className="group">
                                <summary className="flex justify-between items-center px-4 py-3 text-lg font-semibold text-white rounded-lg cursor-pointer hover:bg-white/5">
                                    {item.name}
                                    <FiChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-2 space-y-1 pl-6">
                                    {item.children?.map((child) => (
                                        <a
                                            key={child.name}
                                            href={child.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                                        >
                                            {child.name}
                                        </a>
                                    ))}
                                </div>
                            </details>
                        ))}

                        <a
                            href="#"
                            className="mt-6 block rounded-full bg-indigo-600 px-6 py-3 text-center text-white font-semibold"
                        >
                            View Cart
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
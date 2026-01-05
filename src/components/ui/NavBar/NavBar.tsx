"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de menu hambúrguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-3 border-2  rounded-lg bg-slate-900  hover:text-white"
      >
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
        <div className="w-6 h-0.5 bg-current"></div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40"
        />
      )}

      {/* Menu lateral */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-[#3C5F2D] border-r-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-24 px-6">
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Tops
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Calças
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="block text-orange-500 text-2xl font-medium hover:text-green-600 transition-colors"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

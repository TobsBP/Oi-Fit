'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/src/data/products';

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter(
    product => filterCategory === 'all' || product.category === filterCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#a5c893] text-black p-6">
      {/* Botões de controle */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setSortOrder(sortOrder === 'price-asc' ? 'price-desc' : 'price-asc');
            setCurrentPage(1);
          }}
          className="px-8 py-4 border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-colors"
        >
          Ordenar
        </button>
        <button
          onClick={() => {
            setFilterCategory(filterCategory === 'all' ? 'electronics' : 'all');
            setCurrentPage(1);
          }}
          className="px-8 py-4 border-2 border-white rounded-2xl hover:bg-white hover:text-black transition-colors"
        >
          Filtro
        </button>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {currentProducts.map((product) => (
          <Link
            href={`/pages/products/${product.id}`}
            key={product.id}
            className="aspect-square rounded-2xl p-4 flex flex-col justify-between hover:bg-[#c3dab6] transition-colors cursor-pointer"
          >
            <div>
              <Image 
                src={product.image} 
                alt={product.name} 
                width={300} 
                height={300} 
                className="w-full h-40 object-cover mb-2 rounded" 
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-black mt-1">{product.category}</p>
            </div>
            <p className="text-xl font-bold">R$ {product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white rounded-lg disabled:opacity-50 text-black hover:bg-gray-100"
          >
            Anterior
          </button>
          <span className="text-lg font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white rounded-lg disabled:opacity-50 text-black hover:bg-gray-100"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Informações do filtro ativo */}
      {filterCategory !== 'all' && (
        <div className="mt-6 text-sm text-gray-400">
          Filtrado por: {filterCategory}
        </div>
      )}
    </div>
  );
}
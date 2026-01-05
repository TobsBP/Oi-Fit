import { products } from '@/src/data/products';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#a5c893] text-black p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/pages/products" className="text-blue-600 hover:underline">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#a5c893] text-black p-6">
      <Link 
        href="/pages/products" 
        className="inline-block mb-6 px-6 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
      >
        ← Voltar
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</span>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-[#a5c893] mb-6">R$ {product.price.toFixed(2)}</p>
            
            <div className="prose max-w-none text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            <button className="w-full bg-[#a5c893] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#8eb37d] transition-colors">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

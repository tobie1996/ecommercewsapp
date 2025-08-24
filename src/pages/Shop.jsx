
import React, { useContext, useState } from 'react'
import Product from '../components/Product'
import { ProductContext } from '../contexts/ProductContext'



const Shop = () => {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const clothingCategories = ["men's clothing", "women's clothing", "jewelery", "electronics"];
  const filteredProducts = products
    .filter((item) => clothingCategories.includes(item.category))
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className='mt-40'>
      <h1 className="text-3xl font-bold text-center py-8 mt-10">TOUS LES PRODUITS</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Product product={product} key={product.id} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 text-lg">Aucun produit trouvé.</div>
              )
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
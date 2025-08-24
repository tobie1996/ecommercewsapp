import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
  const {id} = useParams();
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);

  // pour scroller jusqu'a l'ente
  
  useEffect(() => {
    if (id) {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  }, [id]);


// recuperer l'id de details pour afficher le produit
  const product = products.find((item) => {
    return item.id === parseInt(id);
  });

  // filtrer les produits de la meme categorie
  const filteredProducts = products.filter((item) => item.category === product.category);


  if(!product){
    return <section className='h-screen flex justify-center'>
      Loading...
    </section>
  }
// destructuration product
const {title,price,description, image} = product;

  return (
    <div>
        <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
          <div className='container mx-auto'>
              <div className='flex flex-col lg:flex-row items-center'>
              <div className='flex flex-1 justify-center
              items-center mb-8 lg:mb-0'>
                <img className='max-w-[200px] lg:max-w-sm'
                src={image} alt="" />
              </div>
              <div className='flex-1 text-center lg:text-left'>
                <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto
                lg:mx-0'>
                  {title}
                </h1>
                <div className='text-xl text-red-500 font-medium mb-6'>
                  $ {price}
                </div>
                <p className='mb-8'>{description}</p>
                <button onClick={()=> addToCart(product, product.id)}
                 className='bg-black text-white py-4 px-8'>
                 Add to cart
                </button>
              </div>
              </div>
              
          </div>
        </section>

          <section className="py-16 flex align-center justify-center">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 
                lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {filteredProducts.map((item) => (
                <Product key={item.id} product={item} />
                ))}
                </div>
          </div>
        </section>
  </div>
  )
}

export default ProductDetails
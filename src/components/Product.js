import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { BsPlus, BsEyeFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiStar } from 'react-icons/hi';
import { CartContext } from '../contexts/CartContext';

const Product = ({product}) => {
  const {addToCart} = useContext(CartContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const {id, image, category, title, price} = product;
  
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Générer une note aléatoire pour la démo
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviews = Math.floor(Math.random() * 200) + 10;

  return (
    <div 
      className='group relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container principal avec design minimaliste */}
      <div className='bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 relative overflow-hidden'>
        
        {/* Section image rendue cliquable */}
        <Link
          to={`/product/${id}`}
          onClick={handleClick}
          className='relative aspect-square bg-gray-50 block'
          style={{ textDecoration: 'none' }}
        >
          {/* Overlay pour les actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className='flex space-x-3'>
              <button 
                onClick={e => { e.preventDefault(); addToCart(product); }}
                className='bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-200 shadow-lg'
              >
               
              </button>
              <span
                className='bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer'
              >           
             
              </span>
            </div>
          </div>

          {/* Bouton favoris - position fixe */}
          <button 
            onClick={e => { e.preventDefault(); setIsLiked(!isLiked); }}
            className='absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200'
          >
            {isLiked ? (
              <BsHeartFill className='text-red-500 w-4 h-4' />
            ) : (
              <BsHeart className='text-gray-400 hover:text-red-500 w-4 h-4' />
            )}
          </button>

          {/* Badge promotion */}
          <div className='absolute top-4 left-4 z-10'>
            <span className='bg-red-600 text-white text-xs font-medium px-2 py-1 uppercase tracking-wide'>
              Sale
            </span>
          </div>

          {/* Image produit */}
          <div className='w-full h-full flex items-center justify-center p-8'>
            <img 
              className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300' 
              src={image} 
              alt={title} 
            />
          </div>
        </Link>

        {/* Section informations */}
        <div className='p-4 space-y-2'>
          {/* Catégorie */}
          <div className='text-xs text-gray-500 uppercase tracking-widest font-medium'>
            {category}
          </div>

          {/* Titre */}
          <Link to={`/product/${id}`} onClick={handleClick}>
            <h3 className='font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200 text-sm line-clamp-2 leading-relaxed'>
              {title}
            </h3>
          </Link>

          {/* Rating */}
          <div className='flex items-center space-x-1'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className='text-xs text-gray-500'>({reviews})</span>
          </div>

          {/* Prix */}
          <div className='flex items-baseline space-x-2 pt-1'>
            <span className='text-lg font-semibold text-gray-900'>
              ${price}
            </span>
            <span className='text-sm text-gray-400 line-through'>
              ${(price * 1.3).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Barre d'ajout rapide au panier (apparaît au hover) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gray-900 text-white text-center py-2 transform transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button 
            onClick={() => addToCart(product)}
            className='text-sm font-medium hover:text-gray-300 transition-colors duration-200'
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
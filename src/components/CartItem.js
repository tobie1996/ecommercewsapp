import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io'
import { CartContext } from '../contexts/CartContext'

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!item) {
    return (
      <div className="bg-red-100 text-red-700 p-2 rounded text-xs">
        Erreur : article introuvable
      </div>
    );
  }

  const { id, title, image, price, amount } = item;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(id);
    }, 200);
  };

  const totalPrice = parseFloat(price * amount).toFixed(2);

  return (
    <div className={`flex gap-3 py-2 transition-all duration-300 ${
      isRemoving ? 'opacity-50' : ''
    }`}>
      {/* Image produit */}
      <div className='relative flex-shrink-0'>
        <Link to={`/product/${id}`} className='block'>
          <div className='w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center'>
            <img 
              className='max-w-12 max-h-12 object-contain' 
              src={image} 
              alt={title}
            />
          </div>
        </Link>
      </div>

      {/* Informations produit */}
      <div className='flex-1 flex flex-col justify-between'>
        {/* Titre et bouton supprimer */}
        <div className='flex justify-between items-start gap-2'>
          <Link 
            to={`/product/${id}`} 
            className="text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors duration-300 line-clamp-2 flex-1"
          >
            {title}
          </Link>
          <button
            onClick={handleRemove}
            className='p-1 hover:bg-red-50 rounded transition-colors duration-300 flex-shrink-0'
            title="Supprimer"
          >
            <IoMdClose className='text-gray-400 hover:text-red-500 text-sm transition-colors duration-300' />
          </button>
        </div>
        
        {/* Contrôles de quantité et prix */}
        <div className='flex items-center justify-between mt-2'>
          {/* Contrôleur de quantité */}
          <div className='flex items-center bg-gray-50 rounded border overflow-hidden'>
            <button 
              onClick={() => decreaseAmount(id)}
              className='p-1 hover:bg-gray-200 transition-all duration-300 disabled:opacity-40'
              disabled={amount === 1}
              title="Diminuer"
            >
              <IoMdRemove className='text-xs' />
            </button>
            <div className='px-2 py-1 bg-white border-x min-w-[25px] text-center text-xs font-medium'>
              {amount}
            </div>
            <button 
              onClick={() => increaseAmount(id)}
              className='p-1 hover:bg-gray-200 transition-all duration-300'
              title="Augmenter"
            >
              <IoMdAdd className='text-xs' />
            </button>
          </div>
          
          {/* Prix */}
          <div className='text-right'>
            <div className='text-sm font-semibold text-purple-700'>
              ${totalPrice}
            </div>
            <div className='text-xs text-gray-500'>
              ${price} × {amount}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;
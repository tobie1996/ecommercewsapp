import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { IoMdArrowBack } from 'react-icons/io';
import { HiShoppingBag } from 'react-icons/hi';
import { BsCreditCard, BsWhatsapp } from 'react-icons/bs';
import { IoMdAdd, IoMdRemove, IoMdClose } from 'react-icons/io';

// Composant pour un article du panier dans la page complète
const CartPageItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);

  if (!item) return null;

  const { id, title, image, price, amount } = item;
  const totalPrice = parseFloat(price * amount).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className='flex gap-4 p-4'>
        {/* Image produit */}
        <div className='relative group flex-shrink-0'>
          <Link to={`/product/${id}`} className='block'>
            <div className='w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center group-hover:shadow-md transition-all duration-300'>
              <img 
                className='max-w-20 max-h-20 object-contain group-hover:scale-105 transition-transform duration-300' 
                src={image} 
                alt={title}
              />
            </div>
          </Link>
          {/* Badge quantité */}
          <div className="absolute -top-2 -left-2 z-10 bg-purple-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
            {amount}
          </div>
        </div>

        {/* Informations produit */}
        <div className='flex-1 flex flex-col justify-between'>
          {/* Header avec titre et bouton supprimer */}
          <div className='flex justify-between items-start gap-2'>
            <Link 
              to={`/product/${id}`} 
              className="text-lg font-semibold text-gray-800 hover:text-purple-700 transition-colors duration-300 line-clamp-2 flex-1"
            >
              {title}
            </Link>
            <button
              onClick={() => removeFromCart(id)}
              className='p-2 hover:bg-red-50 rounded-lg transition-colors duration-300'
              title="Supprimer du panier"
            >
              <IoMdClose className='text-gray-400 hover:text-red-500 text-lg transition-colors duration-300' />
            </button>
          </div>
          
          {/* Prix unitaire */}
          <div className='text-sm text-gray-600 mt-2'>
            Prix unitaire: <span className='font-medium text-purple-700'>${price}</span>
          </div>
          
          {/* Contrôles de quantité et prix total */}
          <div className='flex items-center justify-between mt-4'>
            {/* Contrôleur de quantité */}
            <div className='flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm'>
              <button 
                onClick={() => decreaseAmount(id)}
                className='p-3 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 disabled:opacity-40'
                disabled={amount === 1}
                title="Diminuer la quantité"
              >
                <IoMdRemove className='text-sm' />
              </button>
              <div className='px-4 py-3 bg-white border-x border-gray-100 min-w-[60px] text-center font-semibold text-gray-800'>
                {amount}
              </div>
              <button 
                onClick={() => increaseAmount(id)}
                className='p-3 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300'
                title="Augmenter la quantité"
              >
                <IoMdAdd className='text-sm' />
              </button>
            </div>
            
            {/* Prix total */}
            <div className='text-right'>
              <div className='text-xl font-bold text-purple-700'>
                ${totalPrice}
              </div>
              <div className='text-sm text-gray-500'>
                ${price} × {amount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  const handleWhatsAppCheckout = () => {
    const orderData = {
      items: cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.amount,
      })),
      total: total,
    };

    const message = `🛍️ *Nouvelle Commande TopShop*\n\n` +
      `📋 *Détails de la commande:*\n` +
      `${orderData.items.map(item => 
        `• ${item.title}\n  Quantité: ${item.quantity}\n  Prix: $${item.price}\n`
      ).join('\n')}` +
      `\n💰 *Total: $${orderData.total.toFixed(2)}*\n\n` +
      `Merci pour votre commande! 🙏`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=237691690285&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Si le panier est vide
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/shop" 
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-300"
              >
                <IoMdArrowBack className="text-xl" />
                <span className="font-medium">Continuer mes achats</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
            </div>
            {/* Panier vide */}
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiShoppingBag className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Votre panier est vide
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Découvrez nos produits et ajoutez vos articles préférés à votre panier.
              </p>
              <Link 
                to="/shop"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <HiShoppingBag className="text-lg" />
                <span>Commencer mes achats</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/shop" 
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-300"
            >
              <IoMdArrowBack className="text-xl" />
              <span className="font-medium">Continuer mes achats</span>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">Mon Panier</h1>
              <p className="text-gray-600">
                {itemAmount} article{itemAmount > 1 ? 's' : ''} dans votre panier
              </p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 transition-colors duration-300 font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
            >
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartPageItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Résumé de la commande
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total ({itemAmount} articles)</span>
                    <span className="font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-medium text-green-600">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>${(parseFloat(total) + parseFloat(total) * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <BsWhatsapp className="text-lg" />
                    <span>Commander sur WhatsApp</span>
                  </button>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                    <BsCreditCard className="text-lg" />
                    <span>Paiement en ligne</span>
                  </button>
                  
                  <Link 
                    to="/shop"
                    className="w-full border-2 border-purple-500 text-purple-500 hover:bg-purple-50 py-3 px-6 rounded-xl font-medium transition-all duration-300 text-center block"
                  >
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
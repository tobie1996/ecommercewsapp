import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward, IoMdTrash, IoMdClose } from 'react-icons/io';
import { BsWhatsapp, BsShieldCheck, BsTruck } from 'react-icons/bs';
import { HiOutlineShoppingBag, HiOutlineGift } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleWhatsAppClick = async () => {
    setIsCheckingOut(true);
    
    try {
      const orderData = {
        items: cart.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.amount || item.quantity, // Support pour les deux noms de propriété
        })),
        total: parseFloat(total).toFixed(2),
      };

      // Créer le message WhatsApp formaté
      const message = `🛍️ *Nouvelle Commande TopShop*\n\n` +
        `📋 *Détails de la commande:*\n` +
        `${orderData.items.map(item => 
          `• ${item.title}\n  Quantité: ${item.quantity}\n  Prix unitaire: $${item.price}\n  Sous-total: $${(item.price * item.quantity).toFixed(2)}\n`
        ).join('\n')}` +
        `\n💰 *TOTAL: $${orderData.total}*\n\n` +
        `📞 Merci pour votre commande! Nous vous contacterons bientôt. 🙏`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=237691690285&text=${encodeURIComponent(message)}`;
      
      // Simuler un délai de traitement
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsCheckingOut(false);
        // Optionnel: vider le panier après commande
        // clearCart();
      }, 1500);
      
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      setIsCheckingOut(false);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const deliveryInfo = [
    { icon: BsTruck, text: 'Livraison gratuite', detail: 'Commandes > $50' },
    { icon: BsShieldCheck, text: 'Paiement sécurisé', detail: '100% sécurisé' },
    { icon: HiOutlineGift, text: 'Emballage cadeau', detail: 'Gratuit' }
  ];

  // Calculer les économies (exemple: 20% de réduction)
  const savings = (parseFloat(total) * 0.2).toFixed(2);

  return (
    <>
      {/* Overlay avec effet de flou */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Sidebar principale */}
      <div className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-black fixed top-0 h-full shadow-2xl md:w-[420px] xl:w-[480px] transition-all duration-300 z-50 flex flex-col overflow-hidden`}>
        
        {/* Header avec design gradient */}
  <div className='relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
          <div className='flex items-center justify-between p-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
                <HiOutlineShoppingBag className='text-2xl' />
              </div>
              <div>
                <h2 className='text-xl font-bold'>Panier d'achat</h2>
                <p className='text-white text-sm'>
                  {itemAmount} {itemAmount === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleClose}  
              className='p-2 hover:bg-purple-900 rounded-full transition-colors duration-300 group'
            >
              <IoMdClose className='text-2xl group-hover:rotate-90 transition-transform duration-300'/>
            </button>
          </div>
          
          {/* Vague décorative */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" className="w-full h-auto">
              <path 
                fill="white" 
                d="M0,20L48,16.7C96,13,192,7,288,8C384,9,480,17,576,20C672,23,768,21,864,18.7C960,17,1056,15,1152,16.7C1248,18,1344,22,1392,24L1440,26L1440,40L1392,40C1344,40,1248,40,1152,40C1056,40,960,40,864,40C768,40,672,40,576,40C480,40,384,40,288,40C192,40,96,40,48,40L0,40Z"
              />
            </svg>
          </div>
        </div>

        {cart.length === 0 ? (
          /* État panier vide amélioré */
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-full flex items-center justify-center">
                <HiOutlineShoppingBag className="text-6xl text-white" />
              </div>
              {/* Éléments décoratifs flottants */}
              {/* Suppression des particules colorées */}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">Votre panier est vide</h3>
            <p className="text-white mb-8 max-w-sm leading-relaxed">
              Découvrez notre collection et ajoutez vos produits favoris pour commencer vos achats
            </p>
            
            <Link 
              to='/' 
              onClick={handleClose}
              className="group bg-gradient-to-r from-purple-900 to-slate-900 hover:from-black hover:to-black text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Découvrir nos produits</span>
              <IoMdArrowForward className='group-hover:translate-x-1 transition-transform duration-300' />
            </Link>
          </div>
        ) : (
          <>
            {/* Liste des articles avec scroll personnalisé */}
            <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-black'>
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-slide-in bg-black rounded-2xl p-4 hover:bg-purple-900 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            {/* Section avantages et promotion */}
            <div className='px-6 py-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-purple-900'>
              <h4 className='font-semibold text-white mb-3 flex items-center'>
                <BsShieldCheck className='mr-2 text-white' />
                Avantages inclus
              </h4>
              <div className='grid grid-cols-1 gap-2'>
                {deliveryInfo.map((info, index) => (
                  <div key={index} className='flex items-center text-sm group hover:bg-black rounded-lg p-2 -mx-2 transition-colors duration-300'>
                    <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300'>
                      <info.icon className='text-purple-900' />
                    </div>
                    <div>
                      <span className='font-medium text-white'>{info.text}</span>
                      <span className='text-white ml-1'>• {info.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Suppression du badge d'économies coloré */}
            </div>

            {/* Footer avec récapitulatif et actions */}
            <div className='p-6 bg-black border-t border-purple-900 space-y-6'>
              {/* Récapitulatif des prix */}
              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-white'>Sous-total ({itemAmount} articles)</span>
                  <span className='text-white font-medium'>${parseFloat(total).toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white'>Livraison</span>
                  <span className='text-white font-medium'>Gratuite</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-white'>TVA incluse</span>
                  <span className='text-white'>${(parseFloat(total) * 0.1).toFixed(2)}</span>
                </div>
                <div className='border-t border-purple-900 pt-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-bold text-white'>Total</span>
                    <div className='text-right'>
                      <div className='text-2xl font-bold text-purple-900'>
                        ${parseFloat(total).toFixed(2)}
                      </div>
                      <div className='text-xs text-white'>Prix TTC</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className='flex space-x-3'>
                <button
                  onClick={() => clearCart()}
                  className='flex-1 bg-black hover:bg-purple-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105'
                >
                  <IoMdTrash />
                  <span>Vider</span>
                </button>
                
                <Link 
                  to='/' 
                  onClick={handleClose}
                  className='flex-1 bg-white hover:bg-purple-900 text-black py-3 px-4 rounded-xl font-medium transition-all duration-300 text-center hover:scale-105'
                >
                  Continuer
                </Link>
              </div>

              {/* Bouton de commande principal avec états */}
              <button  
                onClick={handleWhatsAppClick}
                disabled={isCheckingOut}
                className='w-full bg-gradient-to-r from-purple-900 to-slate-900 hover:from-black hover:to-black disabled:from-black disabled:to-black text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 hover:shadow-lg flex items-center justify-center space-x-3'
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Préparation de votre commande...</span>
                  </>
                ) : (
                  <>
                    <BsWhatsapp className='text-xl animate-pulse' />
                    <span>Commander via WhatsApp</span>
                    <IoMdArrowForward className='text-lg group-hover:translate-x-1 transition-transform duration-300' />
                  </>
                )}
              </button>

              {/* Note de sécurité et contact */}
              <div className='space-y-2 text-center'>
                <p className='text-xs text-gray-500 flex items-center justify-center space-x-2'>
                  <BsShieldCheck className='text-green-500' />
                  <span>Commande sécurisée et cryptée SSL</span>
                </p>
                <p className='text-xs text-gray-400'>
                  Une question ? Contactez-nous au +237 691 690 285
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
          opacity: 0;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-purple-300::-webkit-scrollbar-thumb {
          background-color: #d8b4fe;
          border-radius: 6px;
        }
        
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </>
  )
}

export default Sidebar
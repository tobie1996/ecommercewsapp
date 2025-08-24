// Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward, IoMdTrash, IoMdClose } from 'react-icons/io';
import { BsWhatsapp, BsShieldCheck, BsTruck } from 'react-icons/bs';
import { HiOutlineShoppingBag, HiOutlineGift } from 'react-icons/hi';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';

const Header = () => {
  const { isOpen, handleClose, handleOpen } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleWhatsAppClick = async () => {
    setIsCheckingOut(true);
    
    try {
      const orderData = {
        items: cart.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.amount,
        })),
        total: total,
      };

      // Créer le message WhatsApp
      const message = `🛍️ *Nouvelle Commande TopShop*\n\n` +
        `📋 *Détails de la commande:*\n` +
        `${orderData.items.map(item => 
          `• ${item.title}\n  Quantité: ${item.quantity}\n  Prix: $${item.price}\n`
        ).join('\n')}` +
        `\n💰 *Total: $${orderData.total.toFixed(2)}*\n\n` +
        `Merci pour votre commande! 🙏`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=237691690285&text=${encodeURIComponent(message)}`;
      
      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Erreur lors de l\'ouverture de WhatsApp:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      clearCart();
    }
  };

  return (
    <>
      <header className="w-full bg-slate-900 shadow-sm py-3 px-4 md:px-6 flex items-center justify-between fixed top-0 left-0 z-50">
        <Link to="/" className="text-xl font-bold text-white">
          TopShop
        </Link>
        <nav className="space-x-4 md:space-x-6 flex items-center">
          <Link to="/" className="text-white hover:text-purple-900 text-sm font-medium">
            Accueil
          </Link>
          <Link to="/shop" className="text-white hover:text-purple-900 text-sm font-medium">
            Produits
          </Link>
          <Link to="/about" className="text-white hover:text-purple-900 text-sm font-medium">
            À propos
          </Link>
          <Link to="/contact" className="text-white hover:text-purple-900 text-sm font-medium">
            Contact
          </Link>
          {/* Icône panier */}
          <Link
            to="/cart"
            className="relative cursor-pointer ml-2"
            title="Voir le panier"
          >
            <HiOutlineShoppingBag className="text-xl text-white" />
            <div className="bg-purple-900 absolute -top-2 -right-2 text-xs w-5 h-5 flex justify-center items-center text-white rounded-full">
              {itemAmount}
            </div>
          </Link>
        </nav>
      </header>

      {/* Panier latéral */}
      <div
        className={`${
          isOpen ? 'right-0' : '-right-full'
  } w-full bg-black fixed top-0 h-full shadow-xl md:w-[80vw] lg:w-[50vw] xl:max-w-[40vw] transition-all duration-300 z-20 px-4 lg:px-6 flex flex-col`}
      >
        {/* Header du sidebar */}
  <div className="flex items-center justify-between py-4 border-b border-purple-900">
          <div className="uppercase text-sm font-semibold flex items-center gap-2 text-white">
            <HiOutlineShoppingBag className="text-lg text-white" />
            Panier ({itemAmount})
          </div>
          <div
            onClick={handleClose}
            className="cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-purple-900 rounded-full transition-colors"
          >
            <IoMdClose className="text-xl text-white" />
          </div>
        </div>

        {/* Contenu du panier */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <HiOutlineShoppingBag className="text-4xl text-white mb-3" />
              <p className="text-white mb-2">Votre panier est vide</p>
              <p className="text-white text-sm">Ajoutez des produits pour commencer vos achats</p>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem item={item} key={item.id} />
            ))
          )}
        </div>

        {/* Footer du sidebar */}
        {cart.length > 0 && (
          <div className="flex flex-col gap-y-3 py-4 border-t border-purple-900 bg-black mt-auto">
            {/* Services */}
            <div className="flex items-center justify-between text-xs text-white mb-2">
              <div className="flex items-center gap-1">
                <BsShieldCheck className="text-white" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center gap-1">
                <BsTruck className="text-white" />
                <span>Livraison</span>
              </div>
              <div className="flex items-center gap-1">
                <HiOutlineGift className="text-white" />
                <span>Garantie</span>
              </div>
            </div>

            {/* Total et actions */}
            <div className="flex w-full justify-between items-center mb-3">
              <div className="font-semibold text-white">
                <span className="mr-2">Total:</span> ${parseFloat(total).toFixed(2)}
              </div>
              <div
                onClick={handleClearCart}
                className="cursor-pointer p-2 bg-purple-900 text-white w-10 h-10 flex justify-center items-center text-lg hover:bg-black transition-colors rounded-full"
                title="Vider le panier"
              >
                <IoMdTrash />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <Link
                to="/checkout"
                className="bg-white flex-1 p-3 justify-center items-center text-black font-medium flex gap-2 hover:bg-purple-900 hover:text-white transition-colors rounded-lg text-sm"
                onClick={handleClose}
              >
                Voir le panier
                <IoMdArrowForward className="text-base" />
              </Link>
              
              <button
                onClick={handleWhatsAppClick}
                disabled={isCheckingOut}
                className="bg-purple-900 flex-1 p-3 justify-center items-center text-white font-medium flex gap-2 hover:bg-black transition-colors rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>Envoi...</>
                ) : (
                  <>
                    <BsWhatsapp className="text-base" />
                    WhatsApp
                  </>
                )}
              </button>
            </div>

            {/* Note */}
            <p className="text-xs text-white text-center mt-2">
              Cliquez sur WhatsApp pour finaliser votre commande
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
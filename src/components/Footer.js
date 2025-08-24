import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa'
import { IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5'

const Footer = () => {
  return (
  <footer className="bg-gray-900 relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan */}
  {/* Suppression de l'arrière-plan décoratif pour harmonisation des couleurs */}
      
      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Logo et description */}
          <div className='space-y-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-900 to-slate-900 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>E</span>
              </div>
              <h3 className='text-2xl font-bold text-white'>TopShop</h3>
            </div>
            <p className='text-white leading-relaxed'>
              Découvrez une expérience shopping unique avec nos produits de qualité et notre service client exceptionnel.
            </p>
            <div className='flex space-x-4'>
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <div key={index} className='w-10 h-10 bg-black/40 rounded-full flex items-center justify-center hover:bg-purple-900 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                  <Icon className='text-white group-hover:text-white' />
                </div>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div className='space-y-6'>
            <h4 className='text-xl font-semibold text-white border-b border-purple-900 pb-2 inline-block'>
              Liens Rapides
            </h4>
            <ul className='space-y-3'>
              {['Accueil', 'Produits', 'À propos', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a href="#" className='text-white hover:text-purple-900 hover:translate-x-2 transition-all duration-300 inline-block'>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div className='space-y-6'>
            <h4 className='text-xl font-semibold text-white border-b border-purple-900 pb-2 inline-block'>
              Catégories
            </h4>
            <ul className='space-y-3'>
              {['Mode Femme', 'Mode Homme', 'Électronique', 'Accessoires'].map((category, index) => (
                <li key={index}>
                  <a href="#" className='text-white hover:text-purple-900 hover:translate-x-2 transition-all duration-300 inline-block'>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact et Newsletter */}
          <div className='space-y-6'>
            <h4 className='text-xl font-semibold text-white border-b border-purple-900 pb-2 inline-block'>
              Contactez-nous
            </h4>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <IoLocationOutline className='text-purple-900 text-xl' />
                <span className='text-white text-sm'>123 Rue Commerce, Yaoundé</span>
              </div>
              <div className='flex items-center space-x-3'>
                <IoCallOutline className='text-purple-900 text-xl' />
                <span className='text-white text-sm'>+237 691 690 285</span>
              </div>
              <div className='flex items-center space-x-3'>
                <IoMailOutline className='text-purple-900 text-xl' />
                <span className='text-white text-sm'>info@TopShop.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className='mt-6'>
              <h5 className='text-white font-medium mb-3'>Newsletter</h5>
              <div className='flex'>
                <input 
                  type="email" 
                  placeholder="Votre email"
                  className='flex-1 px-4 py-2 bg-black border border-purple-900 rounded-l-lg text-white placeholder-white focus:outline-none focus:border-white transition-colors'
                />
                <button className='px-6 py-2 bg-gradient-to-r from-purple-900 to-slate-900 text-white rounded-r-lg hover:from-black hover:to-black transition-all duration-300 font-medium'>
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation avec effet brillant */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-purple-900'></div>
          </div>
          <div className='relative flex justify-center'>
            <div className='bg-gradient-to-r from-purple-900 to-slate-900 w-20 h-0.5'></div>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 flex flex-col md:flex-row items-center justify-between'>
          <p className='text-white text-sm flex items-center'>
            Copyright © 2024 TopShop. Fait avec 
            <FaHeart className='text-purple-900 mx-2 animate-pulse' />
            Tous droits réservés.
          </p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a href="#" className='text-white hover:text-purple-900 text-sm transition-colors'>
              Politique de confidentialité
            </a>
            <a href="#" className='text-white hover:text-purple-900 text-sm transition-colors'>
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>

      {/* Effet de particules flottantes */}
  {/* Suppression des particules colorées pour harmonisation */}
    </footer>
  )
}

export default Footer
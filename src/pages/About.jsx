import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">À propos de TopShop</h1>
        <p className="text-white text-lg mb-6">
          TopShop est une boutique en ligne dédiée à offrir une expérience d'achat unique, des produits de qualité et un service client exceptionnel. Notre équipe s'engage à vous satisfaire et à vous accompagner dans tous vos achats.
        </p>
        <div className="border-t border-purple-900 my-6"></div>
        <p className="text-white text-sm">
          Merci de faire confiance à TopShop pour vos besoins quotidiens. Nous sommes là pour vous servir !
        </p>
      </div>
    </div>
  )
}

export default About
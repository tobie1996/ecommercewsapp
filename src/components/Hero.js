import React, { useState, useEffect, useRef } from 'react'
import { BsArrowRight, BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'

// Import des images (assurez-vous d'avoir ces images dans votre dossier src/img/)
import Image1 from '../img/image1.jpg'
import Image2 from '../img/image2.jpg'
import Image3 from '../img/image3.jpg'

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(Array(3).fill(false));
  const imageRefs = useRef([]);
  const intervalRef = useRef(null);
  
  // URLs des images
  const images = [
    Image1,
    Image2,
    Image3
  ];


  // Changer d'image automatiquement
  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, images.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  const handleImageLoad = (index) => {
    console.log(`Image ${index + 1} chargée`);
    setImagesLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  // Vérifier si toutes les images sont chargées
  const allImagesLoaded = imagesLoaded.every(Boolean);

  return (
    <section className='relative min-h-screen overflow-hidden bg-gray-900'>
      {/* Container images */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-0" />
        
        {/* Images */}
        {images.map((imageSrc, index) => (
          <div key={index} className="absolute inset-0 w-full h-full">
              <img
                ref={el => imageRefs.current[index] = el}
                src={imageSrc}
                alt={`Image ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                onLoad={() => handleImageLoad(index)}
              />
            
            {/* Overlay coloré pour chaque image */}
            <div className={`absolute inset-0 w-full h-full ${
              index === 0 ? 'bg-pink-900/30' :
              index === 1 ? 'bg-blue-900/30' :
              'bg-green-900/30'
            } ${index === currentImage ? 'opacity-100 z-15' : 'opacity-0 z-0'} transition-opacity duration-1000`}></div>
          </div>
        ))}
        
        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-20 pointer-events-none"></div>
      </div>

      {/* Indicateur de chargement */}
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-30">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Chargement des images...</p>
            <p className="text-sm text-gray-400 mt-2">
              {imagesLoaded.filter(Boolean).length} / {images.length} chargées
            </p>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className='relative z-30 container mx-auto px-6 py-24 min-h-screen flex items-center'>
        <div className='grid lg:grid-cols-2 gap-12 items-center w-full'>
          
          {/* Contenu textuel */}
          <div className='space-y-8 text-center lg:text-left'>
            {/* Badge tendance */}
            <div className='inline-flex items-center space-x-2 bg-black/70 backdrop-blur-md rounded-full px-6 py-3 text-white border border-white/20'>
              <HiSparkles className='text-yellow-400 animate-pulse text-lg' />
              <span className='text-sm font-medium uppercase tracking-wider'>Nouvelle Tendance</span>
            </div>
            
            {/* Titre principal */}
            <div className='space-y-6'>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white'>
                <span className='block mb-2'>VENTE</span>
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-2'>
                  AUTOMNE
                </span>
                <span className='block text-2xl md:text-4xl lg:text-5xl font-light'>
                  Collection <em className='font-bold not-italic'>Femmes</em>
                </span>
              </h1>
              
              <p className='text-lg md:text-xl text-white/90 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
                Découvrez notre collection exclusive avec jusqu'à{' '}
                <span className='text-yellow-400 font-bold text-xl'>70% de réduction</span>
              </p>
            </div>
            
            {/* Statistiques */}
            <div className='grid grid-cols-3 gap-6 py-8'>
              {[
                { number: '500+', label: 'Produits' },
                { number: '50K+', label: 'Clients' },
                { number: '4.9★', label: 'Avis' }
              ].map((stat, idx) => (
                <div key={idx} className='text-center bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10'>
                  <div className='text-2xl md:text-3xl font-bold text-white mb-1'>{stat.number}</div>
                  <div className='text-sm text-white/70'>{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Boutons d'action */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <button
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                Découvrir Maintenant
                <BsArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="group flex items-center justify-center gap-3 text-white hover:text-yellow-400 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-black/70 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-black/90 transition-all duration-300">
                  {isPlaying ? (
                    <BsPauseFill className="text-xl" />
                  ) : (
                    <BsPlayFill className="text-xl ml-0.5" />
                  )}
                </div>
                <span className="font-medium">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Contrôles images */}
         
        </div>
      </div>
      
      {/* Effet de vague */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill="white" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
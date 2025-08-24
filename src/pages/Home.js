import { useContext } from "react"
import { FaBolt, FaFire, FaMobileAlt, FaShippingFast, FaEnvelope } from "../components/HomeIcons"
import { HiSparkles } from "react-icons/hi"
import Product from "../components/Product"
import { ProductContext } from "../contexts/ProductContext"
import Hero from "../components/Hero"

const Home = () => {
  const {products} = useContext(ProductContext)
  
  const filteredProducts = products.filter((item) => {
    const clothingCategories = ["men's clothing", "women's clothing","jewelery","electronics"];
    return clothingCategories.includes(item.category);
  });

  // Sélection des nouveautés (5 derniers produits)
  const nouveautes = filteredProducts.slice(-5);
  
  // Sélection des plus populaires (5 premiers produits avec les meilleures notes)
  const populaires = filteredProducts
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  return (
    <div>
      <Hero />
      

      {/* Section Nouveautés */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"><HiSparkles className="inline text-yellow-400" /> Nouveautés</h2>
            <p className="text-gray-600">Découvrez nos derniers arrivages</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {nouveautes.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Publicitaire 2 */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2"><FaShippingFast className="inline" /> Livraison Gratuite</h2>
              <p className="text-xl">Pour toute commande supérieure à 50€</p>
            </div>
            <div className="md:w-1/2 text-center md:text-right">
              <div className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold">
                <FaBolt className="text-2xl mr-2" />
                Livraison en 24-48h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits Populaires */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"><FaFire className="inline text-red-500" /> Les Plus Populaires</h2>
            <p className="text-gray-600">Les coups de cœur de nos clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {populaires.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Publicitaire 3 */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2"><FaMobileAlt className="inline" /> Téléchargez Notre App</h2>
          <p className="text-xl mb-8">Accédez à des offres exclusives et suivez vos commandes</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition duration-300">
              <FaMobileAlt className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">Télécharger sur</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </div>
            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition duration-300">
              <FaMobileAlt className="text-2xl" />
              <div className="text-left">
                <div className="text-xs">Disponible sur</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"><FaEnvelope className="inline" /> Restez Informé</h2>
          <p className="text-gray-600 mb-8">Inscrivez-vous à notre newsletter pour recevoir nos dernières offres</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
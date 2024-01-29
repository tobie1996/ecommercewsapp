import { useContext } from "react"
import Product from "../components/Product"
import { ProductContext } from "../contexts/ProductContext"
import { Link } from "react-router-dom"
import {bsPlus, BsEyeFill} from 'react-icons'
import Hero from "../components/Hero"

const Home = () => {

  const {products} = useContext(ProductContext)
  

 
const filteredProducts = products.filter((item) => {
  const clothingCategories = ["men's clothing", "women's clothing","jewelery","electronics"];
  return clothingCategories.includes(item.category);
});



  return (
    <div>
    <Hero/>
      <section className="py-16">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 
            lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {
                  filteredProducts.map((product)=> {
                    return(
                      <Product product={product} key={product.id}/>
                    )
                  })
                }
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home
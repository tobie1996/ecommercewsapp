import React, { useContext, useState,useEffect } from 'react'
import { BsBag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { SidebarContext } from '../contexts/SidebarContext'
import Logo from '../img/logo.svg'


const Header = () => {
  const [isActive,setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);

  useEffect(() => {
    window.addEventListener('scroll',()=> {
      Window.scrollY > 60 ? setIsActive(false): setIsActive(true);
    });
  });

  return (

    <header 
    className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
  } fixed w-full z-10 transition-all`}>

    <div className='container mx-auto flex items-center
    justify-between h-full '>

        <Link to={'/'}>
        <div>
            <img className='w-[40px]' src={Logo} alt="" />
        </div>
        </Link>
   
     
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer flex relative mx-w-[50px]'
        >
        <BsBag className='text-2xl relative -right-[-9px]'/>
        <div className='bg-red-500 absolute -right-[-3px]
        -bottom-2 text-[12px] w-[18px] h-[18px] text-white
        rounded-full flex justify-center items-center'>
          {itemAmount}
         </div>
      </div>
      </div>
    </header>
  )
}

export default Header

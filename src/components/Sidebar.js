import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Only import Link if needed for navigation
import { IoMdArrowForward, IoMdTrash } from 'react-icons/io';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';
// import { pdf } from '@react-pdf/renderer';



// import {
//   Document,
//   Page,
//   Text,
//   View,
//   Table,
//   TableRow,
//   TableCell,
// } from 'react-pdf/dist/esm/components';



const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  // const [whatsappLink, setWhatsAppLink] = useState(null); 
 



  const handleWhatsAppClick = async () => {
    const orderData = {
      items: cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: total,
    };

    // const pdfDoc = (
    //   <Document>
    //     <Page className="p-3">
    //       <View className="mb-4">
    //         <Text className="text-2xl font-bold mb-2">FACTURE</Text>
    //         {/* Ajoutez d'autres informations d'en-tête si nécessaire */}
    //       </View>
    //       <View>
    //         <Table className="w-full border-collapse">
    //           <TableRow className="border-b border-gray-200">
    //             <TableCell className="px-4 py-2 text-left font-bold">Article</TableCell>
    //             <TableCell className="px-4 py-2 text-left font-bold">Prix</TableCell>
    //             <TableCell className="px-4 py-2 text-left font-bold">Quantité</TableCell>
    //           </TableRow>
    //           {orderData.items.map((item) => (
    //             <TableRow key={item.title} className="border-b border-gray-200">
    //               <TableCell className="px-4 py-2">{item.title}</TableCell>
    //               <TableCell className="px-4 py-2">{item.price}</TableCell>
    //               <TableCell className="px-4 py-2">{item.quantity}</TableCell>
    //             </TableRow>
    //           ))}
    //         </Table>
    //         <View className="mt-4">
    //           <Text className="font-bold">Total : {orderData.total}</Text>
    //         </View>
    //       </View>
    //     </Page>
    //   </Document>
    // );


    // const pdfBlob = await pdf(pdfDoc);
    // const url = URL.createObjectURL(pdfBlob);
    // setWhatsAppLink(`https://api.whatsapp.com/send?phone=237691690285&text=${encodeURIComponent(url)}`);
    // window.open(whatsappLink, '_blank'); // Use window.open for external link
  };

  return (
    
    <div className={`${isOpen ? 'right-0' : '-right-full'}
    w-full bg-white fixed top-0 h-full shadow-2xl
     md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
      
     <div className='flex items-center justify-between py-6 border-b'>

     <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
        <div  onClick={handleClose}  className='cursor-pointer w-8 h-8 flex justify-center items-center'>
            <IoMdArrowForward className='text-2xl'/>
        </div>
     </div>

     <div className='flex flex-col gap-y-2 h-[520px] lg:h-[640px]
     overflow-y-auto overflow-x-hidden border-b'>
        {cart.map((item)=> {
            return(
              <CartItem 
              item={item}
              key={item.id}
              />
            )
          })
        }
     </div>

     <div className=' flex flex-col gap-y-3 py-4 mt-4'>
          <div className='flex w-full 
              justify-between items-center'>
            <div className='uppercase font-semibold'>
                  <span className='mr-2'>Total:</span>
                  $ {parseFloat(total).toFixed(2)}
               </div>
                  <div onClick={()=>clearCart()} className='cursor-pointer py-4 bg-red-500 
                  text-white w-12 flex justify-center text-xl'>
                      <IoMdTrash/ >
                  </div>
                </div>
                <Link to={'/'} className='bg-gray-200 flex p-4 justify-center
                items-center text-primary w-full font-medium'>
                  View cart
                </Link>
                <button  
                onClick={()=>handleWhatsAppClick()}  className="bg-black flex p-4 justify-center
                 items-center text-white w-full font-medium">
                Checkout
               
              </button>

            </div>
          </div>  
  )
}

export default Sidebar

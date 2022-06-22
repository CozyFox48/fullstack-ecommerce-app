import { useState } from 'react'
import { EyeIcon, XIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { deleteItem, updateQuantity } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function CartProduct({ product }) {
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()

    function deleteProduct(productId) {
        dispatch(deleteItem(productId))
    }

    function updateQty(stock, itemId) {
        if (quantity <= 0) {
            toast('Your quantity must be at least 1', { type: 'error', autoClose: 2000 })
            setQuantity(product.quantity)
            return
        }
        if (quantity > stock) {
            toast(`Out of stock. Total in stock: ${stock}`, { type: 'warning', autoClose: 2000 })
            setQuantity(product.quantity)
            return
        }
        dispatch(updateQuantity({ cartId: itemId, quantity }))
    }

    return (
        <div className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[35rem] max-w-[100%]">
            <div className="productImage relative w-full h-80">
                <button onClick={() => deleteProduct(product._id)} className="absolute group top-0 left-0 bg-red-500 py-2 px-4 rounded-lg cursor-pointer z-10 hover:bg-gray-700">
                    <XIcon className="w-7 h-7 fill-white" />
                </button>
                <Link to={`/shop/${product.productSlug}`}>
                    <button className="view absolute group top-0 right-0 bg-white py-2 px-4 rounded-lg border-2 border-solid border-gray-800 hover:bg-gray-800 cursor-pointer z-10">
                        <EyeIcon className="w-7 h-7 fill-gray-700 group-hover:fill-white" />
                    </button>
                </Link>
                <img src={product.productImage} alt="" className="object-contain w-full h-80" />
            </div>
            <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{product.productName}</h3>
            <p className="price text-red-500 font-medium text-3xl pb-6 text-center">${product.productPrice}/ -</p>

            <div className="flex gap-4 mb-6">
                <input onChange={e => setQuantity(e.target.value)} type="number" className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium" min="1" value={quantity} />
                <button onClick={() => updateQty(product.inStock, product._id)} className={`w-full btn__style capitalize bg-yellow-500`}>Update</button>
            </div>

            <div className="total text-gray-600 font-medium text-2xl text-center">
                sub total :
                <span className="text-red-500"> ${quantity * product.productPrice}/ -</span>
            </div>
        </div>
    )
}

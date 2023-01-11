import {useGlobal} from './App'
import CartItem from './CartItem'


const CartWrap = () => {
  const {dataItems, total, clearCart} = useGlobal();

  if(dataItems.length === 0) {
    return(
    <div className= 'cart-empty'>
      <h3>Your BAG is currently empty</h3>
    </div>
    )
  }

  return(
    <div className= 'cart-wrap'>
       <h2>YOUR BAG</h2>
       <div className= 'cart-container'>
        { dataItems.map(item => {
        return(
          <CartItem id = {item.id} {...item} />
        )
        })}
       </div>
      <hr></hr>
      <div className= 'total'>
        <p>Total</p>
        <p>${total}</p>
      </div>
      <div className= 'clear-cart'>
        <button onClick= {clearCart}>CLEAR CART</button>
      </div>
    </div>
  )
}

export default CartWrap;
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import {useGlobal} from './App';

const CartItem = ({id, title, price, img, amount}) => {

  const {removeItem, increase, decrease} = useGlobal();
  
  return(
    <div className= 'cart-item'>
      
      <div className= 'cart-info-left'>
        <img src= {img} alt= {title} />
        <div>
          <h4>{title}</h4>
          <p>${price}</p>
          <p className= 'remove' onClick= {() => removeItem(id)}>remove</p>
        </div>
      </div>
      
      <div className= 'amnt'>
        <span onClick= { () => increase(id) }> <FaAngleUp /></span>
        <p>{amount}</p>
        <span onClick= { () => decrease(id) }>< FaAngleDown /></span>
      </div>
      
    </div>
  )
}

export default CartItem;
import {FaShoppingCart} from "react-icons/fa";
import {useGlobal} from './App';

const Navbar = () => {
  const {amount} = useGlobal();
  return(
    <header>
      <div className= 'nav-container'>
        <div className= 'title'>Cart</div>
        <div className= 'cart-info'>
          <FaShoppingCart />
          <span className= 'cart-count'>{amount}</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
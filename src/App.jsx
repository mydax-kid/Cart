import './App.css'
import Navbar from './Navbar'
import CartWrap from './CartWrap'
import React, {useContext, useReducer, useEffect} from 'react'
//import data from './data'

const GlobalContext = React.createContext();

const initialState = {
  loading: false,
  dataItems: [],
  total: 0,
  amount: 0
}

const reducer = (state, action) => {
  
  if (action.type === 'CLEAR_CART') {
    return {...state, dataItems: [] }
  } 
  else if ( action.type === 'REMOVE_ITEM') {
    return { ...state,
            dataItems: state.dataItems.filter( item => item.id !== action.payload )
           }
  }
  else if ( action.type === 'INCREMENT') {
    return {...state,
            dataItems: state.dataItems.map( (item) => 
              item.id === action.payload ? {...item, amount: item.amount + 1} : item)
           }
  }
  else if ( action.type === 'DECREMENT') {
    return {...state,
            dataItems: state.dataItems.map((item) => 
              item.id === action.payload ? {...item, amount: item.amount - 1} : item )
              .filter(item => item.amount !== 0)
           }
  } 
  else if( action.type === 'TOTAL') {
    return{...state, total: action.payload }
  } 
  else if ( action.type === 'AMOUNT') {
    return {...state, amount: action.payload }
  }
  else if (action.type === 'ADD_ITEMS') {
    return { ...state, dataItems: action.payload }
  }
  return state;
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const url = 'https://course-api.com/react-useReducer-cart-project';
  

  const clearCart = () => { dispatch({type: 'CLEAR_CART'}) };

  const removeItem = (id) => { dispatch( {type: 'REMOVE_ITEM', payload: id } ) }

  const increase = (id) => { dispatch( {type: 'INCREMENT', payload: id} )}
  
  const decrease = (id) => { dispatch({type: 'DECREMENT', payload: id}) }

  const updateTotal = () => {
    let total= 0;
    state.dataItems.forEach( item => {
      total = total + (item.price * item.amount)
    })
    //total= Math.floor(total)
    total= parseFloat(total.toFixed(2))
    dispatch( {type: 'TOTAL', payload: total});
  }

  const updateAmount = () => {
    let totalAmnt= 0;
     state.dataItems.forEach( item => {
      totalAmnt = totalAmnt + item.amount
    })
    dispatch( {type: 'AMOUNT', payload: totalAmnt})
    
  }

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({type: 'ADD_ITEMS', payload: data})
    console.log(data)
  }

  useEffect(() => { fetchData() }, []);

  useEffect(() => {
    updateTotal();
    updateAmount();
  }, [state.dataItems])

 
  if (!state.dataItems){
    return (
      <div className= 'loading'><h2>...Loading</h2></div>
    )
  }
  
  return (
    <GlobalContext.Provider value = {{...state, clearCart, removeItem, increase, decrease}}>
      <main>
        <Navbar />
        <CartWrap />
      </main>
    </GlobalContext.Provider>
  )
}

export default App;


export const useGlobal = () => {
  return useContext(GlobalContext);
}

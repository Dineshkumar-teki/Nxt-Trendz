import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachitem => eachitem.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state
    const idList = cartList.map(eachItem => eachItem.id)
    if (idList.includes(product.id)) {
      this.incrementCartItemQuantity(product.id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem =>
      eachItem.id === id
        ? {
            id: eachItem.id,
            title: eachItem.title,
            brand: eachItem.brand,
            quantity: eachItem.quantity + 1,
            price: eachItem.price,
            imageUrl: eachItem.imageUrl,
          }
        : eachItem,
    )
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = (id, quantity) => {
    if (quantity === 1) {
      this.removeCartItem(id)
    } else {
      const {cartList} = this.state
      const updatedCartList = cartList.map(eachItem =>
        eachItem.id === id
          ? {
              id: eachItem.id,
              title: eachItem.title,
              brand: eachItem.brand,
              quantity: eachItem.quantity - 1,
              price: eachItem.price,
              imageUrl: eachItem.imageUrl,
            }
          : eachItem,
      )
      this.setState({cartList: updatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

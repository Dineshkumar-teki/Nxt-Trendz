// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmountList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const totalAmount = totalAmountList.reduce((sum, num) => sum + num)
      return (
        <div className="cartSummary">
          <h3>
            Order Total: <span className="totalAmount">{totalAmount}/-</span>
          </h3>
          <p>{cartList.length} items in Cart</p>
          <button className="checkOutBtn">CheckOut</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

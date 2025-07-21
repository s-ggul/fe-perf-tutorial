import { Link } from "react-router-dom";
import Banner from "./Banner";
import { useCart } from "../contexts/CartContext";

let flag = false;

function Header() {
  const { cart } = useCart();
  const handleMouseOver = () => {
    // 여기서 cartpage에 대한 다이나믹 임포트를 구현함
    if (flag) return;
    import("../pages/CartPage");
    flag = true;
  };

  return (
    <header className="flex flex-col items-center py-8 w-full">
      <div className="flex justify-between items-center w-full max-w-4xl px-4 mb-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-3xl font-bold">Online Gallery</h1>
        </Link>
        <Link
          to="/cart"
          onMouseEnter={handleMouseOver}
          className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <span className="text-2xl">🛒</span>
          {cart.totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.totalItems}
            </span>
          )}
        </Link>
      </div>
      <Banner />
    </header>
  );
}

export default Header;

import {useCart} from "../utils/CartContext.tsx";

function Cart() {

    let CartContext;
    const { cart, addToCart } = useCart();

    return (
        <main className="flex justify-center min-h-screen">
            <div className="w-full max-w-6xl p-5">
                <h2 className="text-center text-4xl font-bold mb-5">Koszyk</h2>

            </div>
        </main>
    )
}

export default Cart;
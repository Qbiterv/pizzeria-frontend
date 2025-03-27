import { useCart } from "../utils/CartContext.tsx";
import CartElement from "../components/elements/cartElement.tsx";
import OrderComplete from "../components/elements/orderComplete.tsx";

function Cart() {
    const { cart, setCart } = useCart();

    const removeProduct = (id: number) => {
        setCart(cart.filter(product => product.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart(cart.map(product => product.id === id ? { ...product, quantity } : product));
    };

    return (
        <main className="flex justify-center min-h-screen">
            <div className="w-full max-w-6xl p-5">
                <h2 className="text-center text-4xl font-bold mb-5">Koszyk</h2>
                <section className={"flex flex-wrap gap-4 text-center justify-center overflow-y-scroll h-3/6 p-6"}>
                    {cart.length > 0 ? (
                        cart.map((product) => (
                            <CartElement
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                imageUrl={product.imageUrl}
                                quantity={product.quantity}
                                category={""}
                                removeProduct={removeProduct}
                                updateQuantity={updateQuantity}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center">Brak produktów</p>
                    )}
                </section>
                <hr className={"m-5"}/>
                <section>
                    <h3 className="text-2xl font-bold">Podsumowanie zamówienia</h3>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Razem: {cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)} zł</p>
                        <OrderComplete></OrderComplete>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Cart;
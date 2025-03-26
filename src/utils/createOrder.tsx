import {useCart} from "./CartContext.tsx";

function useCreateOrderRequest() {
    const { cart } = useCart();

    const createOrderRequest = (name: string, surname: string, email: string, phone: string, address: string) => {
        return {
            name,
            surname,
            email,
            phone,
            address,
            products: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };
    };

    return createOrderRequest;
}

export default useCreateOrderRequest;
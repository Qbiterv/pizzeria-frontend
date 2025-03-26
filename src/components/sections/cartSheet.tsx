import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { useCart } from "../../utils/CartContext.tsx";
import { Button } from "../ui/button.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SheetClose, SheetFooter } from "../ui/sheet.tsx";
import ProductElement from "../elements/productElement.tsx";

function CartSheet() {
    const { cart, setCart } = useCart();

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        let total = 0;
        let quantity = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity;
            quantity += product.quantity;
        });
        setTotalPrice(total);
        setTotalQuantity(quantity);
    }, [cart]);

    const removeProduct = (id: number) => {
        setCart(cart.filter(product => product.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart(cart.map(product => product.id === id ? { ...product, quantity } : product));
    };

    return (
        <Sheet>
            <SheetTrigger>
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round"
                         className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M17 17h-11v-14h-2"/>
                        <path d="M6 5l14 1l-1 7h-13"/>
                    </svg>
                    {totalQuantity > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-7 -translate-y-3.5">
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle><h3 className="text-2xl font-extrabold">Lista produktów</h3></SheetTitle>
                    <SheetDescription>
                        Lista produktów dodanych do koszyka
                    </SheetDescription>
                </SheetHeader>
                <section className="flex flex-col gap-5 content-center items-center overflow-y-scroll h-4/5">
                    { cart?.length > 0 ? cart.map((product) => (
                        <ProductElement key={product.id} id={product.id} name={product.name} price={product.price}
                                        description={product.description} imageUrl={product.imageUrl} quantity={product.quantity}
                                        removeProduct={removeProduct} updateQuantity={updateQuantity} />
                    )) : <p>Brak produktów</p>}
                </section>
                <SheetFooter>
                    <section className="flex flex-col gap-5 content-center justify-center items-center">
                        <div className="flex justify-between w-9/10 mx-auto">
                            <p className="font-extrabold text-xl">Łączna wartość</p>
                            <p className="font-extrabold text-xl">{totalPrice.toFixed(2)} zł</p>
                        </div>
                        <div className="flex flex-col items-center content-center justify-center">
                            <Link to="/cart">
                                <SheetClose>
                                    <Button size={"lg"} className="cursor-pointer">Zamawiam!</Button>
                                </SheetClose>
                            </Link>
                            <HoverCard>
                                <HoverCardTrigger className={"p-2 font-extralight opacity-75"}><Link to={"/"}><SheetClose className={"cursor-pointer"}>Albo kontynuuj zakupy!</SheetClose></Link></HoverCardTrigger>
                                <HoverCardContent>
                                    Naciśnij, aby powrócić do produktów.
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </section>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default CartSheet;
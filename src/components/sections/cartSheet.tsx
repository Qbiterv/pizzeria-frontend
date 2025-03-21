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

import {useCart} from "../../utils/CartContext.tsx";
import {Button} from "../ui/button.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {SheetClose, SheetFooter} from "../ui/sheet.tsx";
import ProductElement from "../elements/productElement.tsx";

function CartSheet() {
    const { cart } = useCart();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity;
        });
        setTotalPrice(total);
    }, [cart]);

    return (
        <Sheet>
            <SheetTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round"
                     className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                    <path d="M17 17h-11v-14h-2"/>
                    <path d="M6 5l14 1l-1 7h-13"/>
                </svg></SheetTrigger>
            <SheetContent className="flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle><h3 className="text-2xl font-extrabold">Lista produktów</h3></SheetTitle>
                    <SheetDescription>
                        Lista produktów dodanych do koszyka
                    </SheetDescription>
                </SheetHeader>
                <section className="flex flex-col gap-5 content-center justify-center items-center overflow-y-scroll h-4/5">
                    { cart?.length > 0 ? cart.map((product) => (
                        <ProductElement key={product.id} id={product.id} name={product.name} price={product.price}
                                        category={product.category} description={product.description} />
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
                                    <Button size={"lg"} className="cursor-pointer">Przejdź do koszyka</Button>
                                </SheetClose>
                            </Link>
                            <HoverCard>
                                <HoverCardTrigger className={"p-2 font-extralight opacity-75"}><Link to={"/"}>Albo kontynuuj zakupy!</Link></HoverCardTrigger>
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
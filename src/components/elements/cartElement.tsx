import { Product } from "../../utils/product.tsx";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import test from "../../assets/test.webp"

interface props extends Product {
    quantity: number;
    category: string;
    removeProduct: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

function CartElement({ id, name, description, category, price, imageUrl, quantity, removeProduct, updateQuantity }: props) {
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            updateQuantity(id, newQuantity);
        }
    };

    return (
        <div className={"flex items-center w-full h-45 border-2 rounded-md justify-between gap-5 transition transform duration-300 hover:scale-102 hover:relative hover:shadow-lg"}>
            <img className={"rounded-4xl p-4 w-1/6 h-full drop-shadow-xl"} src={imageUrl ? imageUrl : test} alt={"Zdjęcie " + imageUrl} />
            <div className={"w-1/3"}>
                <p className={"font-thin text-left italic"}>{category ? category : "test"}</p>
                <div className={"flex flex-col text-left"}>
                    <h3 className={"text-3xl font-bold"}>{name}</h3>
                    <p className={"font-extralight break-words"}>{
                        description ?
                            description.length > 85 ? description.substring(0, 85) + '...' : description
                            : "Brak opisu produktu"}</p>
                </div>
            </div>
            <div className={"w-full flex flex-col"}>
                <div className="flex flex-col w-full justify-center items-end pr-10">
                    <div className="flex justify-center content-center items-center gap-1.25">
                        <p className="text-lg font-semibold">{(price * quantity).toFixed(2)}&nbsp;zł</p>
                        <p className={"font-thin italic text-xs"}>({quantity}x <span>{price.toFixed(2)} zł</span>)</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={"flex justify-center content-center items-center gap-2.5"}>
                            <Input type="number" value={quantity} min={1} max={100} onChange={handleQuantityChange} className="w-16 text-center" />
                        </div>
                        <Button variant="destructive" className="cursor-pointer hover:bg-red-600" onClick={() => removeProduct(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0"/>
                                <path d="M10 11l0 6"/>
                                <path d="M14 11l0 6"/>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartElement;
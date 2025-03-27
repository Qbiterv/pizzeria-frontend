import { Product } from "../../utils/product.tsx";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import test from "../../assets/test.webp"

interface ProductElementProps extends Product {
    quantity: number;
    removeProduct: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

function ProductElement({ id, name, description, price, imageUrl, quantity, removeProduct, updateQuantity }: ProductElementProps) {
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            updateQuantity(id, newQuantity);
        }
    };

    return (
        <div className="w-90 rounded-2xl border-4 p-4 flex items-center content-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img className="w-24 h-24 rounded-full mr-4" src={imageUrl ? imageUrl : test} alt={"Zdjęcie " + imageUrl} />
            <div className="flex items-center justify-between w-full p-2">
                <div>
                    <h4 className="text-xl font-bold">{name}</h4>
                    <p className="font-extralight text-xs">{description ? description : "Testowy opis produktu"}</p>
                    <p className="text-sm text-gray-500">Zestawy</p>
                </div>
                <div className="text-right">
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center content-center items-center">
                        <Input min="1" max="100" type="number" value={quantity} onChange={handleQuantityChange} className="w-16 text-center" />
                        </div>
                        <div className="flex items-center justify-center content-center gap-2 m-auto">
                            <p className="text-lg font-semibold">{price.toFixed(2)}&nbsp;zł</p>
                            <Button variant="destructive" className="cursor-pointer mt-2 hover:bg-red-600" onClick={() => removeProduct(id)}>
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
        </div>
    );
}

export default ProductElement;
import { Link } from "react-router-dom";
import { Button } from "../ui/button.tsx";
import { useCart } from "../../utils/CartContext.tsx";
import { useState } from "react";
import { Input } from "../ui/input.tsx";
import {Product} from "../../utils/product.tsx";
import test from "../../assets/test.webp"

function ProductCard({ id, name, description, price, imageUrl }: Product) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, name, price, quantity, description});
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 500); // Remove highlight after 2 seconds
    };

    return (
        <div className={`block transform transition duration-300 hover:scale-105 ${isAdded ? 'bg-blue-50' : ''}`}>
            <div className="border-2 rounded-md border-border p-3 hover:shadow-lg hover:border-blue-500 h-90 flex flex-col">
                <Link to={`/product/${id}`} className="w-full h-40 object-cover flex justify-center">
                    <img src={imageUrl ? imageUrl : test} className={"rounded-2xl drop-shadow-xl"} alt={"Zdjęcie " + imageUrl} />
                </Link>
                <h3 className="text-center text-xl font-bold mt-2">{name}</h3>
                <p className="text-center font-light overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {description.length > 30 ? description.substring(0, 30) + '...' : description}
                </p>
                <p className="text-center font-semibold mt-2">${price}</p>
                <p className="text-center text-sm text-gray-500">{"test"}</p>
                <div className="mt-auto flex items-center gap-2">
                    <Input
                        className="flex-grow p-2 border rounded w-2/6"
                        type="number"
                        max="99"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <Button className="w-4/6 cursor-pointer" onClick={handleAddToCart}>
                        Do koszyka
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
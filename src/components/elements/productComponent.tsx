import test from "../../assets/test.webp";
import {mealWithQuantity} from "../../utils/meals.tsx";
import {Button} from "../ui/button.tsx";
import {Product} from "../../utils/product.tsx";
import {useCart} from "../../utils/CartContext.tsx";
import {useEffect, useState } from "react";
import axios, {AxiosResponse} from "axios";

function ProductComponent({product}: {product: Product}) {

    const [meals, setMeals] = useState<mealWithQuantity[] | null>(null);

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity: 1 });
        }
    };

    useEffect(() => {
        axios.get("/api/product/meals/" + product.id).then((res: AxiosResponse<mealWithQuantity[]>) => {
            setMeals(res.data);
        }).catch((error) => {
            console.error("Error message:", error.message);
        })
    }, []);

    return (
        <div className="flex items-center w-full gap-5">
            <img src={product.imageUrl ? product.imageUrl : test} alt={product.name} className="h-96 w-96 object-cover rounded-lg shadow-lg" />
            <div className={"h-full flex flex-col justify-between gap-5"}>
                <section>
                    <h3 className="text-6xl font-bold">{product.name}</h3>
                    <div className={"flex gap-2"}>
                        {meals?.length > 1 ? (
                            <p className="text-sm font-bold text-gray-700 flex gap-2">
                                {meals?.map((meal) => (
                                    <p>{meal.quantity}x {meal.meal.name}</p>
                                ))}
                                </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <p className={"w-180 h-54 break-words overflow-clip"}>{product.description ? product.description : "Brak opisu produktu"}</p>
                </section>
                <section className={"flex flex-wrap gap-5 justify-end items-center"}>
                    <p className="text-3xl font-bold">{product.price} zł</p>
                    <Button size={"lg"} className={"cursor-pointer"} onClick={handleAddToCart}>Dodaj do koszyka</Button>
                </section>
            </div>
        </div>
    )
}

export default ProductComponent;
import {ProductWithQuantity} from "../../utils/productsObject.tsx";
import test from "../../assets/test.webp"

interface props extends ProductWithQuantity {
    key: number
}

function ProductOrderElement({key, product, meals, quantity}: props) {
    return (
        <div className={"w-full h-auto flex gap-5 items-center"} key={key}>
            <img className={"w-16 h-16 rounded-full mr-4 drop-shadow-xl"} src={product.imageUrl ? product.imageUrl : test} alt={"Zdjęcie " + product.name}/>
            <div className="flex items-center justify-between w-full p-2">
                <div className={"text-left text-xl font-bold text-xl font-bold mb-2"}>
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    <p className="text-sm thin text-gray-700 flex gap-2">
                        {meals.map((meal) => (
                            <p>{meal.quantity}x {meal.meal.name}</p>
                        ))}
                    </p>
                    <p className="font-extralight text-xs">{product.description ? product.description : "Testowy opis produktu"}</p>
                </div>
                <div className="text-right mb-2 flex flex-col">
                    <p className={"font-bold text-xl"}>{quantity.toPrecision()*product.price.toPrecision()} zł <span className={"font-thin italic text-sm"}>({quantity}x {product.price})</span></p>
                </div>
            </div>
        </div>
    )
}

export default ProductOrderElement;
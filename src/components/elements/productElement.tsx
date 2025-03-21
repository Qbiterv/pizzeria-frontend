import {Product} from "../../utils/product.tsx";

function ProductElement({id, name, description, price, category}: Product) {
    return (
        <div className={"w-80 pt-15 pb-15 rounded-2xl border-4"}>
            {id} {name} {description}
        </div>
    );
}

export default ProductElement;
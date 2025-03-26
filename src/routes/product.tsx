import {useLocation} from "react-router-dom";

function ProductPage() {
    const id = useLocation().pathname.split("/product/")[1];

    return (
        <div>
            <h1>Product {id}</h1>
        </div>
    )
}

export default ProductPage;
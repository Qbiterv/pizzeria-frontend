import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ProductsResponse } from "../../utils/productsObject.tsx";
import ProductOrderElement from "./productOrderElement.tsx";

function OrderProducts({ orderId }: { orderId: number }) {
    const [products, setProducts] = useState<ProductsResponse | null>(null);
    const [productsLoading, setProductsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            axios.get(`/api/products/${orderId}`).then((res: AxiosResponse<ProductsResponse>) => {
                if (res.status === 204) {
                    setProducts(null);
                    setProductsLoading(false);
                    return;
                }

                const data: ProductsResponse = res.data;
                setProducts(data);
                setProductsLoading(false);
            }).catch(error => {
                console.error("Error message:", error.message);
                setProductsLoading(false);
            });
        }

        fetchProducts();
    }, [orderId]);

    return (
        <section className={"w-3/4 flex flex-col border-2 rounded-md shadow-sm p-8 text-center"}>
            {productsLoading ? (
                <p>Ładowanie...</p>
            ) : (
                products ? (
                    products.productsWithQuantity.map((productWithQuantity, index) => (
                        <ProductOrderElement key={index} product={productWithQuantity.product} meals={productWithQuantity.meals} quantity={productWithQuantity.quantity} />
                    ))
                ) : (
                    <p>Brak produktów</p>
                )
            )}
        </section>
    );
}

export default OrderProducts;
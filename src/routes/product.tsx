import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../utils/product.tsx";
import ProductComponent from "../components/elements/productComponent.tsx";

function ProductPage({products}: {products: Product[] | null}) {
    const id = useLocation().pathname.split("/product/")[1];
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (products) {
            const product = products.find((product) => product.id === Number(id));
            if (product) {
                setProduct(product);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }


    }, [id, products]);

    return (
        <main className="flex justify-center min-h-screen">
            <div className="w-full max-w-6xl p-5">
                <h2 className="text-center text-4xl font-bold mb-5">Produkt</h2>
                <section className={"flex flex-wrap justify-center gap-5 content-center items-centers"}>
                    {loading ? (
                        <p>Ładowanie...</p>
                    ) : (
                        product ? (
                            <ProductComponent product={product} />
                        ) : (
                            <p>Brak produktu</p>
                        )
                    )}
                </section>
            </div>
        </main>
    );
}

export default ProductPage;
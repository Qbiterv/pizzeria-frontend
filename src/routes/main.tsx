import ProductCard from "../components/elements/productCard.tsx";
import {Product} from "../utils/product.tsx";

interface Props {
    products?: Product[] | null
}

function Main({products}: Props) {
    console.table(products);

    return (
        <main className="flex justify-center min-h-screen">
            <div className="w-full max-w-6xl p-5">
                <h2 className="text-center text-4xl font-bold mb-5">Produkty</h2>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {products?.length ? products.map((product: Product) => (
                        <ProductCard
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            category={product.category.name}
                            imageUrl={""}
                            key={product.id}
                            id={product.id}
                        />
                    )) : <p className="col-span-full text-center">Brak produktów</p>}
                </section>
            </div>
        </main>
    )
}

export default Main;
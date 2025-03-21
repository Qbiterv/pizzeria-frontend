import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./components/sections/nav.tsx";
import Footer from "./components/sections/footer.tsx";
import Main from "./routes/main.tsx";
import {useEffect, useState} from "react";
import {Product} from "./utils/product.tsx";
import axios from "axios";
import Cart from "./routes/cart.tsx";

function App() {
    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        axios.get("http://localhost:8081/products")
            .then((response) => {
                const data: Product[] = response.data;
                setProducts(data);
                console.log(data); // Log products after state update
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path={"/"} element={<Main products={products} />} />
                    <Route path={"/cart"} element={<Cart></Cart>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
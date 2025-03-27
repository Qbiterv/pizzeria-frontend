import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/sections/nav.tsx";
import Footer from "./components/sections/footer.tsx";
import Main from "./routes/main.tsx";
import { useEffect, useState } from "react";
import { Product } from "./utils/product.tsx";
import axios, {AxiosResponse} from "axios";
import Cart from "./routes/cart.tsx";
import Order from "./routes/order.tsx";
import ProductPage from './routes/product.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

function App() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("/api/products")
            .then((response: AxiosResponse<Product[]>) => {
                const data: Product[] = response.data;
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    console.error("Error response:", error.response);
                } else if (error.request) {
                    console.error("Error request:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
            });
    }, []);

    return (
        <>
            <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <Nav />
                <Routes>
                    <Route path={"/"} element={<Main products={products} loading={loading} />} />
                    <Route path={"/cart"} element={<Cart />} />
                    <Route path={"/order/:id"} element={<Order></Order>} />
                    <Route path={"/product/:id"} element={<ProductPage products={products} />} />
                </Routes>
                <Footer />
                <Toaster />
            </BrowserRouter>
        </>
    )
}

export default App
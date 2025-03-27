import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {OrderObject} from "../utils/orderObject.tsx";
import OrderElement from "../components/elements/orderElement.tsx";
import OrderProducts from "../components/elements/orderProducts.tsx";
import OrderControls from "../components/elements/orderControls.tsx";
import OrderStatus from "../components/elements/orderStatus.tsx";

function Order() {
    const id = useLocation().pathname.split("/order/")[1];
    const [order, setOrder] = useState<OrderObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get("/api/order/" + id).then((res: AxiosResponse<OrderObject>) => {
            if(res.status == 204) {
                setOrder(null);
                return setLoading(false);
            }

            const data: OrderObject = res.data;
            setOrder(data);
            setLoading(false);
        }).catch(error => {
            console.error("Error message:", error.message);
            setLoading(false);
        })

    }, [id]);

    return (
        <main className="flex justify-center min-h-screen">
            <div className="text-center w-full max-w-6xl p-5">
                <h2 className="text-center text-4xl font-bold mb-5">Zamówienie</h2>
            {loading ? (
                <p>Ładowanie...</p>
            ) : (
                order == null ? (
                    <p>Brak zamówienia</p>
                ) : (
                    <>
                        <section className={"flex flex-wrap justify-center gap-5 content-center items-centers"}>
                            <OrderElement id={order.id} name={order.name} surname={order.surname} email={order.email} phone={order.phone} address={order.address} orderDate={order.orderDate} finalized={order.finalized} />
                            <OrderProducts orderId={order.id} />
                            <OrderStatus orderId={order.id} finalized={order.finalized} />
                        </section>
                        <hr className={"m-5"}/>
                        {!order.finalized && <OrderControls orderId={order.id} finalized={order.finalized} />}
                    </>
                )
            )}
            </div>
        </main>
    )
}

export default Order;
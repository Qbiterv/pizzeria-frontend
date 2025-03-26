import {Button} from "../ui/button.tsx";

function OrderControls({orderId}: {orderId: number}) {
    const handleOrderCancel = () => {
        console.log(orderId);
    }

    return (
            <div className="w-3/4 m-auto flex justify-center items-center content-center">
                <Button onClick={() => handleOrderCancel()} className={"cursor-pointer transition transform duration-300 hover:bg-red-500"} variant={"destructive"}>Anuluj zamówienie</Button>
            </div>
    )
}

export default OrderControls;
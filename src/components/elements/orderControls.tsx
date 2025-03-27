import { Button } from "../ui/button.tsx";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

function OrderControls({ orderId, finalized }: { orderId: number, finalized: boolean }) {
    const handleOrderCancel = () => {
        axios.delete("/api/cancel/" + orderId).then((res: AxiosResponse<{ success: boolean; message: string }>) => {
            if (res.status === 400) {
                return toast.error(res.data.message);
            }

            toast.success(res.data.message);
            return window.location.reload();
        }).catch((error) => {
            console.error("Error message:", error.message);
            toast.error(error.response?.data?.message && "Zamówienie nie może zostać anulowane. Jest w trakcie realizacji!" || "An error occurred");
        });
    };

    return (
        <div className="w-3/4 m-auto flex justify-center items-center content-center">
            <Button
                disabled={finalized}
                onClick={handleOrderCancel}
                className="cursor-pointer transition transform duration-300 hover:bg-red-500"
                variant="destructive"
            >
                Anuluj zamówienie
            </Button>
        </div>
    );
}

export default OrderControls;
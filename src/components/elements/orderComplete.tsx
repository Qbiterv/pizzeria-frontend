import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import {ProfileForm} from "./formProfile.tsx";

function OrderComplete() {
    return (
        <Dialog id={"order-complete"}>
            <DialogTrigger>
                <Button size={"lg"} className={"cursor-pointer transform transition duration-300 hover:bg-green-500 hover:scale-110"}>Zamów</Button>
            </DialogTrigger>
            <DialogContent id="order-complete">
                <DialogHeader>
                    <DialogTitle>Dane dostawy</DialogTitle>
                    <DialogDescription>
                        <ProfileForm></ProfileForm>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default OrderComplete;
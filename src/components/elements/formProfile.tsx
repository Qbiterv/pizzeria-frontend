import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../ui/button.tsx"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useCreateOrderRequest from "../../utils/createOrder.tsx";
import axios, { AxiosError, AxiosResponse} from "axios";
import {useCart} from "../../utils/CartContext.tsx";
import {useState} from "react";

export function ProfileForm() {
    const createOrder = useCreateOrderRequest();
    const { cart, setCart } = useCart();
    const [orderLoading, setOrderLoading] = useState<boolean>(false);

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name is too short",
        }).max(50),
        surname: z.string().min(2, {
            message: "Surname is too short",
        }).max(100),
        phone: z.string().min(9, {
            message: "Phone number is too short",
        }).max(100),
        email: z.string().email({
            message: "Email is invalid",
        }),
        address: z.string().min(10, {
            message: "Address is mandatory (or we gonna eat it)",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            email: "",
            address: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const orderRequest = createOrder(values.name, values.surname, values.email, values.phone, values.address);

        setOrderLoading(true);
        document.getElementById("order-button")?.setAttribute("disabled", "true");

        axios.post("/api/order", JSON.parse(JSON.stringify(orderRequest)), {
        })
            .then((res: AxiosResponse) => {
                const data: Response = res.data;
                if(!data.ok) {
                    console.error("Error response:", data.body);
                    // return location.href="/error";
                }

                const resultBody: {
                    success: number;
                    message: string;
                } = data;

                // console.log(resultBody.success, resultBody.message);
                setCart([]);
                setOrderLoading(false);
                document.getElementById("order-button")?.setAttribute("disabled", "false");
                location.href = `/order/${resultBody.message}`;
                // console.log("Działa");
            }). catch((error: AxiosError) => {
                setOrderLoading(false);
                document.getElementById("order-button")?.setAttribute("disabled", "false");
                console.error("Error message:", error.message);
                // return location.href="/error";
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className={"flex gap-5 flex-wrap"}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imię</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jakub" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nazwisko</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sebastianowicz" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefon</FormLabel>
                                <FormControl>
                                    <Input type={"tel"} placeholder="111 222 333" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type={"email"} placeholder={"test@auctane.com"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adres dostawy</FormLabel>
                            <FormControl>
                                <Input placeholder="Kostrzyńska 4, Zielona Góra" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                    <Button id={"order-button"} variant={"default"} size={"lg"} className={"cursor-pointer"} type="submit">
                        {orderLoading ? (
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "Zamów"}
                    </Button>
            </form>
        </Form>
    )
}

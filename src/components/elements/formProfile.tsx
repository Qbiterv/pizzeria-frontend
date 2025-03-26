import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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

export function ProfileForm() {
    const createOrder = useCreateOrderRequest();
    const { cart, setCart } = useCart();

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
                location.href = `/order/${resultBody.message}`;
                // console.log("Działa");
            }). catch((error: AxiosError) => {
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

                    <Button size={"lg"} className={"cursor-pointer"} type="submit">Zamów</Button>
            </form>
        </Form>
    )
}

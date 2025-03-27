import {Link} from "react-router-dom";
import {Button} from "../ui/button.tsx";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {navigationMenuTriggerStyle} from "../ui/navigation-menu.tsx";
import CartSheet from "./cartSheet.tsx";

function Nav() {
    return (
        <nav className={"text-center flex justify-between items-center p-5 w-3/4 max-w-3/4 min-w-1/4 ml-auto mr-auto mt-5 mb-5 border-2 rounded-2xl"}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to={"/"}>
                            <NavigationMenuLink href={"/"} className={navigationMenuTriggerStyle()}>
                                Sklep
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>                    <NavigationMenuItem>
                        <Link to={"/cart"}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Zamówienie
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <CartSheet />
                            </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to={"https://github.com/Qbiterv/pizzeria"} target={"_blank"}>
                            <Button className={"cursor-pointer flex items-center just"}>GitHub
                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="24" height="24" viewBox="0 0 24 24"
                                                                             fill="none" stroke="currentColor"
                                                                             stroke-width="2" stroke-linecap="round"
                                                                             stroke-linejoin="round"
                                                                             className="icon icon-tabler icons-tabler-outline icon-tabler-external-link">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"/>
                                <path d="M11 13l9 -9"/>
                                <path d="M15 4h5v5"/>
                            </svg>
                            </Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}

export default Nav;
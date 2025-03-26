import {OrderObject} from "../../utils/orderObject.tsx";
import {date} from "zod";

interface props extends OrderObject {

}

function OrderElement({id, name, surname, email, phone, address, orderDate, finalized}: props) {
    const dateUnix = Date.parse(orderDate);
    const date = new Date(dateUnix).toLocaleDateString("pl-PL");
    const time = new Date(dateUnix).toLocaleTimeString("pl-PL");

    return (
        <>
            <div key={id} className={"w-3/4 flex flex-col border-2 rounded-md shadow-sm p-8 text-center"}>
                <div className={"flex justify-between items-center"}>
                    <h3 className={"text-2xl font-bold"}>Informacje ogólne</h3>
                    <p className={"italic"}>Identyfikator: <span className={"bg-gray-200 italic"}>{id}</span></p>
                </div>
                <section className={"flex flex-col gap-5"}>
                    <div className={"flex justify-center content-center items-center flex-col"}>
                        <label className={"font-light"}  htmlFor={"name-surname"}>Imię i nazwisko</label>
                        <p id={"name-surname"} className={"text-4xl font-bold"}>{name} {surname}</p>
                    </div>
                    <div className={"flex justify-center content-center items-center flex-col"}>
                        <label className={"font-light"}  htmlFor={"contact-info"}>Dane kontaktowe</label>
                        <p id={"contact-info"} className={"text-4xl font-bold"}>{phone} <br/> {email}</p>
                    </div>
                    <div className={"flex justify-center content-center items-center flex-col"}>
                        <label className={"font-light"}  htmlFor={"contact-info"}>Adres dostawy</label>
                        <p id={"contact-info"} className={"text-4xl font-bold"}>{address}</p>
                    </div>
                    <div>
                        <label className={"font-light"} htmlFor={"date"}>Data zamówienia</label>
                        <p id={"date"} className={"font-bold"}>{date + " - " + time}</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default OrderElement;
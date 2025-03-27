import auctaneLogo from "@/assets/auctane.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full pl-20 pr-20 pb-10 bg-white text-black flex flex-col justify-center items-center">
            <div className="flex md:flex-row flex-col gap-10 items-start mb-5">
                <div className="flex md:flex-row flex-col items-center gap-5 justify-center content-center">
                    <img className="h-32 mb-2" src={auctaneLogo} alt="Logo auctane" />
                    <section>
                        <div className="mb-5">
                            <h4 className="text-xl font-bold mb-2">Opis strony</h4>
                            <p className={"break-words"}>Projekt aplikacji <span className={"font-bold"}>"pizzeria"</span> realizowany w ramach praktyk w zespole <Link to={"https://amazingauctane.com"} target={"_blank"} className={"font-bold url_animation w-fit"}>Auctane Inc.</Link> Aplikacja multi-modułowa obsługująca składanie zamówienia, zarządzanie jego stanem, komunikację za pomocą maila.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Autorzy</h4>
                            <div className={"flex items-center gap-5"}>
                                <Link to={"https://github.com/Qbiterv"} target={"_blank"} rel={"noopener noreferrer"}>
                                    <p className={"url_animation w-fit"}>Jakub Wawrzynowicz</p>
                                </Link>
                                <Link to={"https://github.com/sefel08"} target={"_blank"} rel={"noopener noreferrer"}>
                                    <p className={"url_animation w-fit"}>Sebastian Kosmala</p>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
                <section className={"w-1/4"}>
                    <h4 className="text-2xl font-bold mb-2">Nawigacja</h4>
                    <ul>
                        <li>
                            <Link to="/" className="url_animation transition transform duration-300 hover:underline hover:underline-offset-4">
                                Start
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="url_animation transition transform duration-300 hover:underline hover:underline-offset-4">
                                Zamówienie
                            </Link>
                        </li>
                        <li>
                            <Link to="https://github.com/Qbiterv/pizzeria" target="_blank" rel="noopener noreferrer" className="url_animation transition transform duration-300 hover:underline hover:underline-offset-4">
                                GitHub - Backend
                            </Link>
                        </li>
                        <li>
                            <Link to="https://github.com/Qbiterv/pizzeria-frontend" target="_blank" rel="noopener noreferrer" className="url_animation transition transform duration-300 hover:underline hover:underline-offset-4">
                                GitHub - Frontend
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
            <div className="text-center mt-5">
                <p>Auctane Inc. - {year} ®</p>
            </div>
        </footer>
    );
}

export default Footer;
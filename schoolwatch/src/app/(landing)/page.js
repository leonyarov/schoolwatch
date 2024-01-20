
import Link from "next/link";
import { Welcome } from "../components/welcome/Welcome";
import { Contact } from "../components/contact/Contact";
import { About } from "../components/about/About";
import { Footer } from "../components/footer/Footer";
import { LoginModal } from "../components/navbar/LoginModal";
import { JoinUs } from "../components/joinus/JoinUs";
import { Reviews } from "../components/reviews/Reviews";
import Image from "next/image";
import { Prices } from "../components/prices/Prices";

export default function Page() {


  return <main>
    <Welcome />
    <JoinUs />
    <LoginModal />
    <Prices />
    <Reviews />
    <About />
    <Footer />

  </main>
}
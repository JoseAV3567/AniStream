// src/Components/Footer.js
import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    // site-footer
    <footer className="bg-[#0c0c16] text-[#a7a7a7] font-sans py-10 border-t-4 border-[#5bcb72]">
      {/* footer-content */}
      <div className="max-w-6xl mx-auto px-5 grid gap-8 grid-cols-1 text-center md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:text-left">
        {/* Sección del Logo y Descripción */}
        <div className="footer-section about">
          {/* logo-text */}
          <h2 className="text-2xl font-bold text-white mb-4">
            <img
              src="/Anistream.png"
              alt="Anistream Logo"
              className="h-20 w-20 rounded-full object-cover logo-svg"
            />
          </h2>
          <p className="text-sm leading-relaxed">
            La mejor plataforma para disfrutar de tus animes favoritos. Un
            proyecto hecho con pasión para fans.
          </p>
        </div>

        {/* Sección de Enlaces Rápidos */}
        <div className="footer-section links">
          <h3 className="text-white text-lg font-semibold mb-5">Navegación</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2.5">
              <a
                href="/"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Inicio
              </a>
            </li>
            <li className="mb-2.5">
              <a
                href="/series"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Series
              </a>
            </li>
            <li className="mb-2.5">
              <a
                href="/directorio"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Directorio
              </a>
            </li>
            <li>
              <a
                href="/calendario"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Calendario
              </a>
            </li>
          </ul>
        </div>

        {/* Sección de Información */}
        <div className="footer-section info">
          <h3 className="text-white text-lg font-semibold mb-5">Información</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2.5">
              <a
                href="/terminos"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Términos de Servicio
              </a>
            </li>
            <li className="mb-2.5">
              <a
                href="/privacidad"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className="text-[#a7a7a7] no-underline transition-all duration-300 hover:text-[#2ce872] hover:pl-1.5"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="footer-section social">
          <h3 className="text-white text-lg font-semibold mb-5">Síguenos</h3>
          {/* social-icons */}
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a7a7a7] text-2xl transition-all duration-300 hover:text-[#5bcb72] hover:-translate-y-1"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a7a7a7] text-2xl transition-all duration-300 hover:text-[#5bcb72] hover:-translate-y-1"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a7a7a7] text-2xl transition-all duration-300 hover:text-[#5bcb72] hover:-translate-y-1"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a7a7a7] text-2xl transition-all duration-300 hover:text-[#5bcb72] hover:-translate-y-1"
            >
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior con el copyright */}
      <div className="text-center mt-10 pt-5 border-t border-[#333355] text-xs">
        &copy; {new Date().getFullYear()} aniStream.com | Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;

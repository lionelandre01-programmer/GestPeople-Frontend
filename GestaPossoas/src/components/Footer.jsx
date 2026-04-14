export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-500" id="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10" id="foot">

          {/* Marca */}
          <div className="foot1">
            <h2 className="text-lg font-semibold text-neutral-400">
              GestPeople
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Soluções digitais modernas com foco em eficiência,
              escalabilidade e experiência do utilizador.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Sobre", "Serviços", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-neutral-300 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-4">
              Recursos
            </h3>
            <ul className="space-y-2 text-sm">
              {["Blog", "Documentação", "Suporte", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-neutral-300 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>suporte@gestpeople.com</li>
              <li>+244 900 000 000</li>
              <li>Luanda, Angola</li>
            </ul>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" id="footBottom">

          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} GESTPEOPLE
          </p>

          <div className="flex gap-6 text-xs">
            <p>
              TODOS OS DIREITOS RESERVADOS
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
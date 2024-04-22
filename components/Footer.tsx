import { links } from "@/lib/footerLinks";
import Link from 'next/link'

function Footer() {
  return (
    <footer className="max-w-7xl mx-auto flex flex-col md:flex-row gap-y-7 gap-x-20 items-center justify-between w-full p-5 pb-10">
      <h3 className="text-2xl font-bold uppercase tracking-wider">
        Adekola's E-COMMERCE Store
      </h3>
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 place-content-between w-full mx-auto">
        {links.map((link) => (
          <Link key= {link} href='/'>
          <p className="text-left font-semibold tracking-wider text-sm text-dark dark:text-gray-100">
            {link}
          </p></Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;

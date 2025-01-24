import { navLinks } from "@/data/constant";
import Link from "next/link";
const Navbar = () => {
    return (
        <>
          <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          MindLoom
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link,index) => (
                <li key={index}>
              <Link href={link.href} className="text-slate-500  hover:text-slate-700">
                {link.title}
              </Link>
            </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
        </>
    )
}

export default Navbar;
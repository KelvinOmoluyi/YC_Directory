import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" width={144} height={30} alt="logo" />
                </Link>
            </nav>
        </div>
    );
}
 
export default Navbar;
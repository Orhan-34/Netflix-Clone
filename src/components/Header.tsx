import Link from "next/link";
import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { logout } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<header className={`${isScrolled && "bg-slate-950"}`}>
			{" "}
			{/*className={"bg-[#141414]"}*/}
			<div className="flex items-center space-x-2 md:space-x-10">
				<Link href="/">
					<img
						alt="Netflix Logo"
						src="https://rb.gy/ulxxee"
						width={120}
						height={120}
						className="cursor-pointer object-contain"
					/>
				</Link>
				<ul className="hidden space-x-4 md:flex">
					<li className="headerLink">Home</li>
					<li className="headerLink">Tv Shows</li>
					<li className="headerLink">Movies</li>
					<li className="headerLink">New & Popular </li>
					<li className="headerLink">My List</li>
				</ul>
			</div>
			<div className="flex items-center space-x-4 text-sm font-light">
				<IoSearch className="hidden sm:inline w-6 h-6" />
				<p className="hidden lg:inline">Kids</p>
				<BiBell className="w-6 h-6" />
				{/* <Link href="/account"> */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<img
					onClick={logout}
					src="https://rb.gy/g1pwyx"
					alt=""
					className="cursor-pointer rounded"
				/>
				{/* </Link> */}
			</div>
		</header>
	);
};

export default Header;

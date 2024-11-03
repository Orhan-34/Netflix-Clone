import type { Movie } from "../../typings";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface RowProps {
	title: string;
	movies: Movie[];
}

const Row = ({ title, movies }: RowProps) => {
	const rowRef = useRef<HTMLDivElement>(null);
	const [isMoved, setIsMoved] = useState(false);

	const handleClick = (direction: string) => {
		setIsMoved(true);

		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;

			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};
	// console.log(rowRef.current?.scrollLeft, rowRef.current?.clientWidth);
	return (
		<div className="h-40 space-y-0.5 md:space-y-2">
			<h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
				{title}
			</h2>
			<div className="group relative md:-ml-2">
				<ChevronLeftIcon
					className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 ${
						!isMoved && "hidden"
					}`}
					onClick={() => handleClick("left")}
				/>

				<div
					ref={rowRef}
					className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
				>
					{movies.map((movie) => (
						<Thumbnail key={movie.id} movies={movie} />
					))}
				</div>

				<ChevronRightIcon
					className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer  transition hover:scale-125`}
					onClick={() => handleClick("right")}
				/>
			</div>
		</div>
	);
};

export default Row;

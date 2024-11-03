import Image from "next/image";
import type { Movie } from "../../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtoms";

interface ThumbnailProps {
	movies: Movie;
}

const Thumbnail = ({ movies }: ThumbnailProps) => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="relative h-28 min-w-[180px] cursor-pointer transition duration-300 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
			onClick={() => {
				setCurrentMovie(movies);
				setShowModal(true);
			}}
		>
			<Image
				src={`https://image.tmdb.org/t/p/w500${
					movies.backdrop_path || movies.poster_path
				}`}
				className="rounded-sm object-cover md:rounded"
				layout="fill"
				alt={movies.name}
			/>
		</div>
	);
};

export default Thumbnail;

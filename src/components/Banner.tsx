import Image from "next/image";
import type { Movie } from "../../typings";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constant/movie";
import { FaPlay } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtoms";

interface BannerProps {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: BannerProps) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
	useEffect(() => {
		setMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)],
		);
	}, [netflixOriginals]);
	return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] justify-end lg:pb-12 px-4">
			<div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
				<Image
					src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
					alt="movie-poster"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
				{movie?.title || movie?.name || movie?.original_name}
			</h1>
			<p className="max-w-xs text-xs text-shadow-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{movie?.overview}
			</p>
			<div className="flex space-x-3">
				<button onClick={() => setShowModal(true) } type="button" className="bannerButton bg-white text-black">
					<FaPlay className="h-4 w-4 text-black md:w-7 md:h-7 pr-1" />
					Play
				</button>
				<button
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
					className="bannerButton bg-gray-500/40"
				>
					<HiInformationCircle className="h-4 w-4 md:w-8 md:h-8" />
					More info
				</button>
			</div>
		</div>
	);
};

export default Banner;

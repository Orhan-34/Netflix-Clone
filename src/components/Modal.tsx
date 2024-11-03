import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtoms";
import {
	HandThumbUpIcon,
	PauseIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import type { Element, Genre } from "../../typings";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaVolumeUp } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/24/solid";
import { RiVolumeOffVibrateLine } from "react-icons/ri";

export default function Modal() {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState("");
	const [genres, setGenres] = useState<Genre[]>([]);
	const [muted, setMuted] = useState(false);
	const [playing, setPlaying] = useState(false);
	useEffect(() => {
		if (!movie) return;

		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					movie?.media_type === "tv" ? "tv" : "movie"
				}/${movie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`,
			)
				.then((response) => response.json())
				.catch((err) => console.log(err.message));

			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Element) => element.type === "Trailer",
				);
				setTrailer(data.videos?.results[index]?.key);
			}
			if (data?.genres) {
				setGenres(data.genres);
			}
		}
		fetchMovie();
	}, [movie]);

	const handleClose = () => {
		setShowModal(false);
	};

	console.log(trailer);

	return (
		<MuiModal
			open={showModal}
			onClose={handleClose}
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full
                 max-w-5xl overflow-hidden overflow-y-scroll rounded-lg scrollbar-hide"
		>
			<>
				<button
					onClick={handleClose}
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
				>
					<XMarkIcon className="w-6 h-6" />
				</button>

				<div className="relative pt-[56.25%]">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width="100%"
						height="100%"
						style={{ position: "absolute", top: "0", left: "0" }}
						playing={playing}
						muted={muted}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
					/>
					<div className="absolute flex items-center justify-between w-full bottom-10 px-10">
						<div className="flex space-x-2">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => setPlaying(!playing)}
								className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
							>
								{playing ? (
									<PauseIcon className="w-7 h-7 text-black" />
								) : (
									<FaPlay className="w-7 h-7 text-black" />
								)}
                                {playing ? 'Pause' : 'Play'}
							</button>
							<button className="modalButton">
								<PlusIcon className="w-7 h-7" />
							</button>
							<button className="modalButton">
								<HandThumbUpIcon className="w-7 h-7" />
							</button>
						</div>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="modalButton" onClick={() => setMuted(!muted)}>
							{muted ? (
								<RiVolumeOffVibrateLine className="w-6 h-6" />
							) : (
								<FaVolumeUp className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center space-x-2 text-sm">
							<p className="font-semibold text-green-500">
								{movie?.vote_average * 10}% Match
							</p>
							<p className="font-light">
								{movie?.release_date || movie?.first_air_date}
							</p>
							<div className="flex h-4 items-center justify-center rounded border border-white px-1.5 text-xs bg-red-700 font-semibold">
								HD
							</div>
						</div>
						<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
							<p className="w-5/6">{movie?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm ">
								<div>
									<span className="text-[gray]">Genres: </span>
									{genres.map((genre) => genre.name).join(", ")}
								</div>
								<div>
									<span className="text-[gray]">Original lannguage: </span>
									{movie?.original_language}
								</div>
								<div>
									<span className="text-[gray]">Total votes: </span>
									{movie?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

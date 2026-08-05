import Image from "next/image";
import { Heart, X } from "lucide-react";

import { distros } from "./data/distros";
import { MatchingAlgorithm } from "./data/core/matching_algorithm";

export default function Home() {

  const matchingAlgorithm = new MatchingAlgorithm(distros);
  const random_distro = matchingAlgorithm.getRandomDistro();

  return (
    <div className="flex flex-col gap-5 justify-center items-center flex-1 bg-zinc-50 font-sans dark:bg-[#1a1a2e]">
      <div className="absolute top-0 w-full h-12 border-b border-b-[#2e2e4a] flex justify-center items-center text-2xl font-semibold">
        <h1 className="inline-block text-6xl font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">Linuxinder</h1>
      </div>
      <div className="w-2xl rounded-xl dark:bg-[#1e1e35] shadow-xl">
        <div className="relative w-full h-96 rounded-xl overflow-hidden">
          <Image
            src={"/screenshots/ubuntu.png"}
            alt={random_distro.name}
            width={3840}
            height={2160}
            className="absolute"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-black to-transparent pl-5 flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">{random_distro.name} <span className="text-muted font-normal text-2xl">{new Date().getFullYear() - random_distro.release_date.getFullYear()}</span></h1>
            <p>{random_distro.tagline}</p>
          </div>
        </div>
        <div className="p-5">
        
        <p>{random_distro.description}</p>
        <div>
          {random_distro.tags.map((tag) => (
            <span key={tag} className="inline-block bg-sky-400 text-white text-xs px-2 py-1 rounded-full mr-2 p-1">
              {tag}
            </span>
          ))}
        </div>
        </div>
      </div>
      <div className="flex justify-around w-64">
        <button className="border border-red-700 rounded-4xl w-16 h-16 text-red-700 flex justify-center items-center active:scale-90 cursor-pointer"><X/></button>
        <button className="border border-lime-600 rounded-4xl w-16 h-16 text-lime-600 flex justify-center items-center active:scale-90 cursor-pointer"><Heart/></button>
      </div>
      <p className="text-muted text-xs">← Swipe left to dislike, right to like →</p>
    </div>
  );
}

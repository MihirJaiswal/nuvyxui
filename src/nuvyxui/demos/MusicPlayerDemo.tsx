import React from "react";
import { MusicPlayer } from "@/nuvyxui/components/MusicPlayer";

export default function MusicPlayerCardsDemo() {
  const albums = [
    {
      theme: "spotify",
      artwork: "/assets/images/music-player/song.jpg",
      trackTitle: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      initialTime: 30,
      totalDuration: 194,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {albums.map((album, index) => (
        <div key={index} className="flex flex-col w-full max-w-xs">
          <MusicPlayer
            theme={album.theme}
            shadow={true}
            rounded="xl"
            artwork={album.artwork}
            trackTitle={album.trackTitle}
            artist={album.artist}
            album={album.album}
            initialTime={album.initialTime}
            totalDuration={album.totalDuration}
            controls={{
              shuffle: true,
              repeat: true,
              heart: true,
            }}
          />
        </div>
      ))}
    </div>
  );
}

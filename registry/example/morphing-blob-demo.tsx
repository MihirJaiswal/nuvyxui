import { MorphingBlob } from "../ui/morphing-blob";
import { MoonIcon } from "@radix-ui/react-icons";

export const MorphingBlobDemo = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black w-full h-full rounded-xl">
      <div className="w-full flex flex-col md:flex-row gap-24 items-center justify-center rounded-full pb-20">
        <div className="absolute top-14 left-34 h-72 w-78 bg-blue-400/30 rounded-full blur-xl shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"></div>
         <div className="absolute top-14 right-34 h-72 w-78 bg-red-400/30 rounded-full blur-xl shadow-[0_0_50px_rgba(96,165,250,0.4)] animate-pulse"></div>
        <MorphingBlob
          theme="primary"
        >
          <div className="text-center p-6 z-2">
            <MoonIcon className="h-10 w-10 mx-auto mb-3 text-white" />
            <h4 className="text-xl w-full font-bold mb-2 text-white">Nuvyx UI</h4>
          </div>
        </MorphingBlob>
        <MorphingBlob
          theme="aurora"
        >
          <div className="text-center p-6 z-2">
            <MoonIcon className="h-10 w-10 mx-auto mb-3 text-white" />
            <h4 className="text-xl w-full font-bold mb-2 text-white">Nuvyx UI</h4>
          </div>
        </MorphingBlob>
      </div>
    </div>
  );
};
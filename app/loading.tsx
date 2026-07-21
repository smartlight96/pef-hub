import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center space-y-8">
        
        {/* Logo with rotating border */}
        <div className="relative h-32 w-32">
          {/* Glow background */}
          <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
          
          {/* Image */}
          <div className="relative h-full w-full rounded-full bg-zinc-900 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/images/logo2.png"
                alt="PEF HUB"
                fill
                priority
                className="object-contain p-3"
                sizes="128px"
              />
            </div>
          </div>
          
          {/* Spinning border */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
        </div>

        {/* Text with loading dots */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-wider">
            PEF HUB
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="h-2 w-2 rounded-full bg-orange-300 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>

      </div>
    </div>
  );
}
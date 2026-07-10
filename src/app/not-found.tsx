import Link from "next/link";
import { PrismMark } from "@/components/primitives/prism-mark";

/**
 * NOT FOUND — nobody lost, nobody trapped. Even the 404 carries the way home to
 * the white light.
 */
export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <div className="mx-auto mb-8 w-fit">
          <PrismMark size={48} />
        </div>
        <p className="murmur mb-4 opacity-60">Off the beam</p>
        <h1 className="font-voice text-display-1">This ray doesn&apos;t exist.</h1>
        <p className="mx-auto mt-5 max-w-md text-body-large opacity-70">
          The light didn&apos;t bend this way. Let&apos;s get you back to the
          source.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-body no-underline transition-colors hover:border-white/40"
        >
          Return to the light
        </Link>
      </div>
    </div>
  );
}

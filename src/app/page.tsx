/**
 * THE HOMEPAGE — "The Light." The cinematic scroll narrative; the flagship film.
 * Seven movements, one continuous space. The visitor's scroll is the camera.
 *
 * Emotional progression:
 *   I Aperture (Curiosity) → II Refraction (Awe) → III Record (Credibility) →
 *   IV The Man (Human Connection) → V Five Ways (Trust) →
 *   VI Mission (Inspiration) → VII Door (Action).
 *
 * The film is a server-rendered document: real headings in real order, one
 * landmark section per movement. It reads as a coherent outline unstyled — the
 * accessibility law and the SEO gift, together.
 */

import { MovementAperture } from "@/components/home/movement-aperture";
import { MovementRefraction } from "@/components/home/movement-refraction";
import { MovementRecord } from "@/components/home/movement-record";
import { MovementTheMan } from "@/components/home/movement-the-man";
import { MovementFiveWays } from "@/components/home/movement-five-ways";
import { MovementMission } from "@/components/home/movement-mission";
import { MovementDoor } from "@/components/home/movement-door";

export default function HomePage() {
  return (
    <>
      <MovementAperture />
      <MovementRefraction />
      <MovementRecord />
      <MovementTheMan />
      <MovementFiveWays />
      <MovementMission />
      <MovementDoor />
    </>
  );
}

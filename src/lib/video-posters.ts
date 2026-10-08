import type { StaticImageData } from "next/image";
import draws from "@/assets/video/-jjMuLRIk4s.jpg";
import dallas from "@/assets/video/A8AWfpc4oag.jpg";
import documents from "@/assets/video/ajg_JxlUPVM.jpg";
import beginners from "@/assets/video/bMoVComyyfI.jpg";
import brrrr from "@/assets/video/lNZkzlCaoIU.jpg";
import honolulu from "@/assets/video/Lt3MwArGP_Q.jpg";
import fundedFast from "@/assets/video/ncIvS1Es3uc.jpg";
import walkthrough from "@/assets/video/pPumrpAaiwc.jpg";
import loanAmount from "@/assets/video/rrFlOT9AbeE.jpg";
import interestReserve from "@/assets/video/V8--nI2muqQ.jpg";
import dscr from "@/assets/video/XTrthacQyiw.jpg";
import type { videos } from "@/lib/site";

/** Self-hosted posters for `videos` in site.ts, keyed by `poster`. */
export const videoPosters: Record<(typeof videos)[keyof typeof videos]["poster"], StaticImageData> = {
  "-jjMuLRIk4s.jpg": draws,
  "A8AWfpc4oag.jpg": dallas,
  "ajg_JxlUPVM.jpg": documents,
  "bMoVComyyfI.jpg": beginners,
  "lNZkzlCaoIU.jpg": brrrr,
  "Lt3MwArGP_Q.jpg": honolulu,
  "ncIvS1Es3uc.jpg": fundedFast,
  "pPumrpAaiwc.jpg": walkthrough,
  "rrFlOT9AbeE.jpg": loanAmount,
  "V8--nI2muqQ.jpg": interestReserve,
  "XTrthacQyiw.jpg": dscr,
};

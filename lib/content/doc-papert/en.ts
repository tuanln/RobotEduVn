import type { DocPapertContent } from "./types";

/** Ba URL và địa chỉ `mailto:` giữ nguyên — chúng là địa chỉ, không phải văn. */
export const DOC_PAPERT_EN: DocPapertContent = {
  heading: "Read Papert",
  introPrefix:
    "The whole way of learning at Làng Maker traces back to a 1980 book (2nd edition 1993) by Seymour Papert: ",
  bookTitle: "Mindstorms — Children, Computers, and Powerful Ideas",
  introSuffix:
    ". MIT Media Lab has posted the full text publicly, free of charge, with the Papert family's permission.",
  downloadLabel: "Download the original",
  downloadSize: "(PDF, 60 MB)",
  readOnlineLabel: "Read online, no download needed",
  officialSourceLabel: "Official source:",
  officialSourceLinkText: "MIT Media Lab's publication page",
  communityBold: "A Vietnamese translation is being crowd-translated",
  communityMiddle: " by the community, with a ",
  communityBookTitle: "Làng Maker Story",
  communityAfter:
    " after every chapter — telling how ten years of Maker Việt have lived out that exact chapter's ideas.",
  notifyLinkText: "Get notified when the translation is ready",
  links: {
    pdfUrl: "https://dam-prod.media.mit.edu/x/2025/01/27/Mindstorms.pdf",
    archiveUrl: "https://archive.org/details/mindstormschildr0000pape",
    mitUrl: "https://www.media.mit.edu/publications/mindstorms/",
    mailto:
      "mailto:lang@makerviet.org?subject=Nhận%20tin%20bản%20tiếng%20Việt%20Mindstorms",
  },
};

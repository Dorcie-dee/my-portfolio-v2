/**
 * Colour treatment for each project's decorative panel, assigned by position so the
 * showcase cycles through the palette. All text/background pairs meet WCAG AA (see docs).
 */
export type ProjectTone = {
  panel: string;
  text: string;
};

const tones: ProjectTone[] = [
  { panel: "bg-marigold", text: "text-plum" },
  { panel: "bg-violet", text: "text-white" },
  { panel: "bg-lilac", text: "text-plum" },
  { panel: "bg-plum", text: "text-marigold" },
];

export function projectTone(index: number): ProjectTone {
  return tones[index % tones.length];
}

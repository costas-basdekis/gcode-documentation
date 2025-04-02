export type GcodeParameterValue = {
  tag: string,
  type: string,
};
export type GcodeParameter = {
  description: string,
  label: string,
  optional: boolean,
  tag: string,
  values: GcodeParameterValue[],
};
export type Source = "Marlin" | "RepRap" | "Klipper";
export type GcodeInfo = {
  brief: string,
  codes: string[],
  id: string,
  parameters: GcodeParameter[],
  related: string[],
  source: Source,
  title: string,
  url: string,
};
export type GcodeInfoGroup = GcodeInfo[];
export interface GcodeMeta {
  type: "meta",
  date: string,
}
export type GcodeInfoSet = {
  [name: string]: GcodeInfoGroup,
};

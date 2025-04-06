import type { TForm } from "./TForm";
export type TParent = TForm & { children: TForm[] };
import { createTss } from "tss-react";
import { useContext } from "theme";

export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
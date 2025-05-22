import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-N9ZRVK0WQ1"; // ⬅️ Replace this with your real ID

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPage = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
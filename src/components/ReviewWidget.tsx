import { useEffect, memo } from 'react';
import { useTranslation } from "i18n"
import Typo from "@mui/material/Typography";
import { useStyles } from "tss";

declare global {
    interface Window {
        wpShowReviews?: (id: number, theme: string) => void;
    }
}

export const ReviewWidget = memo(() => {
    const { theme } = useStyles();
    useEffect(() => {
        const loadScript = (src: string, callback: () => void): (() => void) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = callback; // Ensure the script is ready before executing the callback
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        };

        const initializeWidget = (): void => {
            if (window.wpShowReviews) {
                window.wpShowReviews(268065, "white");
            }
        };

        // Using the returned cleanup function to remove the script on unmount
        const cleanupScript = loadScript("https://cdn1.mariages.net/js/wp-widget.js?symfnw-FR48-1-20241003-008_www_m_", initializeWidget);

        return () => {
            cleanupScript();
        };
    }, []);

    const { t } = useTranslation("Contact");

    return (
        <div style={{
            "marginBottom": theme.spacing(20)
        }} id="wp-widget-reviews">
            <div id="wp-widget-preview">
                <a href="https://www.mariages.net/musique-mariage/recital-production--e268065/avis" rel="nofollow"><Typo variant="body2">{t("reviewText")}</Typo></a> &nbsp;
                <a href='https://www.mariages.net' rel="nofollow">
                    <img src="https://cdn1.mariages.net/assets/img/logos/gen_logoHeader.svg" height="20" alt="Mariages.net Logo" />
                </a>
            </div>
        </div>
    );
});


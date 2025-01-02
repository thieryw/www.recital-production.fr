import { useEffect, memo } from "react";
import { useStyles } from "tss";

export const ElfSight = memo(() => {
    useEffect(() => {
        // Dynamically load the Elfsight script
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup the script when the component is unmounted
            document.body.removeChild(script);
        };
    }, []);
    const { theme } = useStyles();

    return (
        <div
            style={{
                "marginBottom": theme.spacing(12)
        }}
            className="elfsight-app-f81b1e86-12c9-4336-986d-24628e637280"
            data-elfsight-app-lazy
        ></div>
    );
});


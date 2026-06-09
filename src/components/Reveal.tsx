import { memo, useEffect, type ReactNode } from "react";
import { motion, useAnimation, useReducedMotion, type Variant } from "framer-motion";
import { useInView } from "react-intersection-observer";

export type RevealProps = {
    className?: string;
    children: ReactNode;
    /** Delay before the reveal starts, in seconds. */
    delay?: number;
    /** Vertical offset to slide in from, in pixels. */
    offset?: number;
    /** Animation duration, in seconds. */
    duration?: number;
};

/**
 * Wraps its children in a subtle fade & slide-in reveal that triggers once,
 * when the element enters the viewport.
 *
 * The children are always present in the DOM (framer-motion only animates
 * transform / opacity), so the prerendered SEO snapshot keeps all content.
 *
 * Respects `prefers-reduced-motion`: when the user opts out, the content is
 * rendered statically with no transform or opacity transition.
 */
export const Reveal = memo((props: RevealProps) => {
    const { className, children, delay = 0, offset = 32, duration = 0.8 } = props;

    const prefersReducedMotion = useReducedMotion();

    const [ref, inView] = useInView({ "triggerOnce": true, "threshold": 0.2 });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    const variants: Record<string, Variant> = prefersReducedMotion
        ? {
              "hidden": {},
              "visible": {}
          }
        : {
              "hidden": {
                  "opacity": 0,
                  "y": offset
              },
              "visible": {
                  "opacity": 1,
                  "y": 0,
                  "transition": {
                      "ease": "easeOut",
                      duration,
                      delay
                  }
              }
          };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            animate={controls}
            initial="hidden"
        >
            {children}
        </motion.div>
    );
});

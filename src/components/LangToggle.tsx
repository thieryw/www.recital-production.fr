import { memo, Fragment } from "react";
import { tss } from "tss";
import Typo from "@mui/material/Typography";
import { useLang } from "i18n";
import { useRoute } from "router";
import { pushToAlternateLang } from "seo/localized";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { Lang } from "seo/seoData";

export type LangToggleProps = {
    className?: string;
    /** Render colours for a dark background (white/gold2) vs light (body/gold1). */
    isDark: boolean;
    /** Translated aria-label for the group (e.g. "Switch language"). */
    ariaLabel: string;
};

const LANGS: readonly Lang[] = ["fr", "en"];

/**
 * Consistent FR / EN segmented control used in both the header bar and the
 * footer. The active language is rendered as a non-interactive label
 * (aria-current); the other language is a button that navigates to the current
 * page's alternate-language URL (i18nifty's language then follows the route —
 * see Body.tsx).
 */
export const LangToggle = memo((props: LangToggleProps) => {
    const { className, isDark, ariaLabel } = props;
    const { lang } = useLang();
    const route = useRoute();

    const switchLang = useConstCallback(() => {
        pushToAlternateLang(route.name);
    });

    const { classes, cx } = useStyles({ isDark });

    return (
        <div className={cx(classes.root, className)} role="group" aria-label={ariaLabel}>
            {LANGS.map((l, index) => {
                const isActive = l === lang;
                return (
                    <Fragment key={l}>
                        {
                            index !== 0 &&
                            <span aria-hidden="true" className={classes.divider}>/</span>
                        }
                        {
                            isActive
                                ? <span className={cx(classes.item, classes.active)} aria-current="true">
                                    <Typo variant="button" className={classes.label}>{l.toUpperCase()}</Typo>
                                </span>
                                : <button type="button" className={cx(classes.item, classes.button)} onClick={switchLang}>
                                    <Typo variant="button" className={classes.label}>{l.toUpperCase()}</Typo>
                                </button>
                        }
                    </Fragment>
                );
            })}
        </div>
    );
});

const useStyles = tss
    .withName("LangToggle")
    .withParams<{ isDark: boolean }>()
    .create(({ theme, isDark }) => ({
        "root": {
            "display": "flex",
            "alignItems": "center"
        },
        "item": {
            "display": "inline-flex",
            "alignItems": "center",
            "padding": 0,
            "border": "none",
            "background": "transparent",
            "lineHeight": 1
        },
        "button": {
            "cursor": "pointer",
            "color": isDark ? theme.palette.white.main : undefined,
            "transition": "color 500ms",
            ":hover": {
                "color": isDark ? theme.palette.gold2.main : theme.palette.gold1.main
            },
            ":focus-visible": {
                "outline": `2px solid ${isDark ? theme.palette.gold2.main : theme.palette.gold1.main}`,
                "outlineOffset": 2
            }
        },
        "active": {
            "color": isDark ? theme.palette.gold2.main : theme.palette.gold1.main,
            "& > *": {
                "fontWeight": "bold"
            }
        },
        "label": {
            "color": "inherit"
        },
        "divider": {
            "marginLeft": theme.spacing(1),
            "marginRight": theme.spacing(1),
            "opacity": 0.5,
            "userSelect": "none"
        }
    }));

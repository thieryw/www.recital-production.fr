import { memo, type ReactNode } from "react";
import { tss } from "tss";
import { type Link } from "tools/link";
import Typo from "@mui/material/Typography";


export type HeaderProps = {
    className?: string;
    logo: ReactNode;
    links: Link[];
    isDark?: boolean;
    mobile?: {
        socialLinks: {
            iconUrl: string;
            href: string;
        }[];
        bottomDiv: ReactNode;
    };
    activeLinkLabel?: string;
}


export const Header = memo((props: HeaderProps) => {
    const { links, logo, /*mobile,*/ className, isDark, activeLinkLabel } = props;
    const { windowInnerWidth, theme, cx, classes } = useStyles();
    return (
        <header className={cx(classes.root, className)}>
            {
                (()=>{
                    if(windowInnerWidth >= theme.breakpoints.values.sm){
                        return <div className={classes.desktopWrapper}>
                            {logo}
                            {
                                links.map(({ label, href, onClick }) => <Link 
                                    key={label}
                                    isActive={label === activeLinkLabel}
                                    isDark={isDark ?? false}
                                    href={href}
                                    onClick={onClick}
                                    label={label}


                                />)
                            }

                        </div>
                    }

                    return <div>

                    </div>
                })()
            }

        </header>
    )
})

const useStyles = tss.withName("Header").create(() => {
    return ({
        "root": {

        },
        "desktopWrapper": {

        }
    })
})

const { Link } = (() => {
    const Link = memo((props: Omit<Link, "target"> & { isActive: boolean; isDark: boolean; }) => {
        const { href, label, onClick, isActive } = props;
        const { classes } = useStyles({
            isActive
        });
        return (
            <div className={classes.root}>
                <a className={classes.link} onClick={onClick} href={href}><Typo className={classes.linkText} variant="button">{label}</Typo></a>
                <div className={classes.underline}>

                </div>

            </div>
        )
    })

    const useStyles = tss
        .withName("Link")
        .withNestedSelectors<"underline">()
        .withParams<{ isActive: boolean; }>()
        .create(() => {
            return ({
                "root": {

                },
                "underline": {

                },
                "link": {},
                "linkText": {}

            })
        })

    return { Link }
})()
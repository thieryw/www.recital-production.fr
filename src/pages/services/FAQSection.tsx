import { memo } from "react";
import { FAQ } from "components/FAQ";
import { useTranslation } from "i18n";
import { tss } from "tss";
import Typo from "@mui/material/Typography";



export const FAQSection = memo(() => {
    const { t } = useTranslation("Services");
    const { classes } = useStyles();
    return (
        <section className={classes.root}>
            <Typo className={classes.title} variant="h2">{t("faqSectionTitle")}</Typo>
            <div className={classes.questions}>
                {
                    [
                        {
                            "question": t("faq1"),
                            "response": t("response1")

                        },
                        {
                            "question": t("faq2"),
                            "response": t("response2")

                        },
                        {
                            "question": t("faq3"),
                            "response": t("response3")

                        },
                        {
                            "question": t("faq4"),
                            "response": t("response4")

                        }
                    ].map(({ question, response }, index) => <FAQ
                        number={index + 1}
                        question={question}
                        response={response}
                        isOpen={index === 1}
                        className={classes.question}
                        key={index}
                    />)
                }

            </div>

        </section>
    )
});

const useStyles = tss.create(({theme}) => {
    return ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            ...(()=>{
                const value = theme.spacing(5);
                return {
                    "paddingLeft": value,
                    "paddingRight": value
                }
            })()
        },
        "title": {
            "textAlign": "center",
            "marginBottom": theme.spacing(11)
        },
        "questions": {},
        "question": {
            "marginBottom": theme.spacing(4)
        }
    })
})
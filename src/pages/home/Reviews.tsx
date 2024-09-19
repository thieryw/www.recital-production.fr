import { CardSlider } from "components/CardSlider";
import { memo } from "react";
import { tss } from "tss";
import { reviews } from "user/reviews";



export const Reviews = memo(() => {
    const {classes} = useStyles();
    return (
        <section className={classes.root}>
            <CardSlider 
                cards={[
                    ...reviews,
                ]}

            />
        </section>
    )
});

const useStyles = tss.create(({theme})=>{
    return ({
        "root": {
            "paddingLeft": theme.spacing(4),
            "paddingRight": theme.spacing(4)

        }
    })
})
import { Box, styled } from "@mui/material";


const FlipCardContainer = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
});

const FlipCard = styled(Box)(() => ({
    backgroundColor: 'transparent',
    maxWidth: '500px',
    width: "100%",
    margin: '30px auto',
    perspective: '1000px',
}));

const FlipCardInner = styled('div')(({ flipped }) => ({
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : "",
    minHeight: '100px',
}));

const FlipCardFront = styled('div')({
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    minHeight: 'inherit',
    objectFit: 'cover',
    ":before": {
        content: "'Front'",
        position: 'absolute',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'rotateZ(-30deg)',
        fontSize: '100px',
        opacity: '15%',
        fontWeight: 'bold',
    }
});

const FlipCardBack = styled('div')({
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    minHeight: 'inherit',
    transform: 'rotateY(180deg)',
    position: 'absolute',
    top: 0,
    ":before": {
        content: "'Back'",
        position: 'absolute',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'rotateZ(-30deg)',
        fontSize: '100px',
        opacity: '15%',
        fontWeight: 'bold',
    }
});

const CardImage = styled('img')({
    borderRadius: '12px',
});

function PhotoFlipCard({ front, back, isFlipped = false }) {

    return (<>
        <FlipCardContainer>
            <FlipCard>
                <FlipCardInner flipped={isFlipped}>
                    <FlipCardFront sx={{ position: isFlipped ? 'absolute' : 'relative' }}>
                        <CardImage src={front} />
                    </FlipCardFront>
                    <FlipCardBack sx={{ position: !isFlipped ? 'absolute' : 'relative' }}>
                        <CardImage src={back} />
                    </FlipCardBack>
                </FlipCardInner>
            </FlipCard>
        </FlipCardContainer>
    </>
    );
}

export default PhotoFlipCard;
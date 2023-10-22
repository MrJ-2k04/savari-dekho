import { Flip } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { useState } from "react";


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
}));

const FlipCardFront = styled('div')({
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    minHeight: 'inherit',
    objectFit: 'cover',
});

const FlipCardBack = styled('div')({
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    minHeight: 'inherit',
    transform: 'rotateY(180deg)',
    position: 'absolute',
    top: 0,
});

const CardImage = styled('img')({
    borderRadius: '12px',
});

function PhotoFlipCard({ front, back }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const toggleFlip = () => setIsFlipped(!isFlipped);
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
        <Button endIcon={<Flip />} onClick={toggleFlip}>Flip</Button>
    </>
    );
}

export default PhotoFlipCard;
import { Box, Button, styled } from "@mui/material";
import { useState } from "react";


const FlipCardContainer = styled('div')({
    // background: '#b5b0b0',
    // height: '99vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
});

const FlipCard = styled('div')(({ }) => ({
    backgroundColor: 'transparent',
    maxWidth: '500px',
    width: "100%",
    minHeight: '300px',
    perspective: '1000px',
}));

const FlipCardInner = styled('div')(({ flipped }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transform: flipped ? 'rotateY(180deg)' : "",
}));

const FlipCardFront = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    backgroundColor: '#bbb',
    color: 'black',
});

const FlipCardBack = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    backgroundColor: '#2980b9',
    color: 'white',
    transform: 'rotateY(180deg)',
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
                    <FlipCardFront>
                        <CardImage src={front}  />
                    </FlipCardFront>
                    <FlipCardBack>
                        <CardImage src={back} />
                    </FlipCardBack>
                </FlipCardInner>
            </FlipCard>
        </FlipCardContainer>
        <Button onClick={toggleFlip}>Flip</Button>
    </>
    );
}

export default PhotoFlipCard;
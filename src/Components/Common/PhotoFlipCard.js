import { Box, Button } from "@mui/material";



function PhotoFlipCard({ front, back }) {
    return (<>
        <Box className={"flipcard-container"}>
            <Box aria-label="front" className={"flipcard flipcard-front"}>
                <Box component={"img"} src={front} height={"400px"} width={"400px"} />
            </Box>
            <Box aria-label="back" className={"flipcard flipcard-back"}>
                <Box component={"img"} src={back} height={"400px"} width={"400px"} />
            </Box>
        </Box>
        <Button>Flip</Button>
    </>
    );
}

export default PhotoFlipCard;
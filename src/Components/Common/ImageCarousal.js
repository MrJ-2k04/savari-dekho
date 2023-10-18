import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

function ImageCarousal({ children }) {

    const moveHorizontal = keyframes`
    0% {
      transform: translateX(0)
    }
    100% {
      transform: translateX(-100%)
    }
  `;

    const ImageCarousalContainer = styled(Box)(({ theme }) => ({
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '12px',
        display: 'flex',
        gap: '16px',
        minWidth: '100%',
        '::before': {
            content: "''",
            background: `linear-gradient(to right, ${theme.palette.background.default} 0%, rgba(255, 255, 255, 0) 100%)`,
            height: '100%',
            position: 'absolute',
            width: '200px',
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'rotateZ(180deg)',
            right: '-64px',
        },
        '::after': {
            content: "''",
            background: `linear-gradient(to right, ${theme.palette.background.default} 0%, rgba(255, 255, 255, 0) 100%)`,
            height: '100%',
            position: 'absolute',
            width: '200px',
            zIndex: 1,
            pointerEvents: 'none',
            top: 0,
            left: '-64px',
        },
    }));

    const ImageCarousal = styled(Box)(({ children }) => ({
        display: 'flex',
        animation: `${moveHorizontal} ${children.length * 12}s linear infinite`, // Animation on hover
        animationPlayState: 'running',
        gap: "16px",
        minWidth: 'max-content'
    }));

    const Images = React.Children.map(children, (child) => (
        React.cloneElement(child, {
            style: {
                width: '400px',
                height: '300px',
                borderRadius: '12px',
                boxSizing: 'content-box',
                objectFit: 'cover',
                WebkitTransition: 'all 100ms ease',
                transition: 'all 100ms ease',
                ...child.props.style, // Preserve any existing styles
            },
        })
    ))

    return (
        <ImageCarousalContainer>
            <ImageCarousal>
                {Images}
            </ImageCarousal>
            <ImageCarousal aria-hidden="true">
                {Images}
            </ImageCarousal>
        </ImageCarousalContainer>
    );
}

export default ImageCarousal;

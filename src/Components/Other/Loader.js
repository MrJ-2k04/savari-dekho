import { useTheme } from "@emotion/react";


function Loader() {
    const theme = useTheme();
    const colors = {
        verticalStart: theme.palette.primary.main,
        verticalEnd: theme.palette.primary.main,
        horizontalStart: theme.palette.secondary.main,
        horizontalEnd: theme.palette.secondary.main,
    }
    const loaderStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80px',
        height: '80px',
        transform: 'translate(-50%, -50%) rotate(45deg) translate3d(0, 0, 0)',
        animation: 'loader 1.2s infinite ease-in-out'
    };

    const keyframes = `
        @keyframes loader {
            0%, 10%, 100% {
                width: 80px;
                height: 80px;
            }
            65% {
                width: 150px;
                height: 150px;
            }
        }
        @keyframes loaderBlock {
            0%, 30% {
                transform: rotate(0);
            }
            55% {
                background-color: ${colors.verticalEnd};
            }
            100% {
                transform: rotate(90deg);
            }
        }
        @keyframes loaderBlockInverse {
            0%, 20% {
                transform: rotate(0);
            }
            55% {
                background-color: ${colors.horizontalEnd};
            }
            100% {
                transform: rotate(-90deg);
            }
        }
    `;

    const styleTag = document.createElement('style');
    styleTag.appendChild(document.createTextNode(keyframes));
    document.head.appendChild(styleTag);

    const spanStyle = {
        position: 'absolute',
        display: 'block',
        width: '40px',
        height: '40px',
        backgroundColor: colors.verticalStart,
        animation: 'loaderBlock 1.2s infinite ease-in-out both'
    };

    const spanInverseStyle = {
        position: 'absolute',
        display: 'block',
        width: '40px',
        height: '40px',
        backgroundColor: colors.horizontalStart,
        animation: 'loaderBlockInverse 1.2s infinite ease-in-out both'
    };

    return (
        <div style={loaderStyle}>
            <span style={{ ...spanStyle, top: '0', left: '0' }}></span>
            <span style={{ ...spanInverseStyle, top: '0', right: '0' }}></span>
            <span style={{ ...spanInverseStyle, bottom: '0', left: '0' }}></span>
            <span style={{ ...spanStyle, bottom: '0', right: '0' }}></span>
        </div>
    );
}

export default Loader;

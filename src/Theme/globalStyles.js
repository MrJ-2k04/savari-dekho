// material
import { useTheme } from "@mui/material/styles";
import { GlobalStyles as GlobalThemeStyles } from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <GlobalThemeStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        button: {
          '&[hidden]': {
            display: 'none',
          },
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            // "&::-webkit-outer-spin-button": {
            //   margin: 0,
            //   WebkitAppearance: "none",
            // },
            // "&::-webkit-inner-spin-button": {
            //   margin: 0,
            //   WebkitAppearance: "none",
            // },
          },
          "&[type=file]": {
            cursor: "pointer",
            "&::-webkit-file-upload-button": {
              cursor: 'pointer',
            }
          }
        },
        textarea: {
          "&::-webkit-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::-moz-placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          "&:-ms-input-placeholder": {
            color: theme.palette.text.disabled,
          },
          "&::placeholder": {
            color: theme.palette.text.disabled,
          },
        },

        img: { display: "block", maxWidth: "100%" },

        // Lazy Load Img
        ".blur-up": {
          WebkitFilter: "blur(5px)",
          filter: "blur(5px)",
          transition: "filter 400ms, -webkit-filter 400ms",
        },
        ".blur-up.lazyloaded ": {
          WebkitFilter: "blur(0)",
          filter: "blur(0)",
        },

        /* width */
        "&::-webkit-scrollbar": {
          width: "5px",
          height: "5px",
          marginLeft: "5px",
        },

        /* Track */
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },

        /* Handle */
        "&::-webkit-scrollbar-thumb": {
          background: "#37b6b6",
          borderRadius: "5px",
        },

        /* Handle on hover */
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#254e71",
        },
      }}
    />
  );
}

import { useTheme } from "@emotion/react";
import { PeopleAlt } from "@mui/icons-material";
import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { selectIsDarkMode } from "Store/selectors";
import { useSelector } from "react-redux";

const StatCard = ({ count, label, badge, icon, onClick }) => {
  const theme = useTheme();
  const isDarkMode = useSelector(selectIsDarkMode);
  const shadowColor = alpha(isDarkMode ? "#666" : "#333", 0.24);
  return (
    <Card
      onClick={onClick}
      sx={{
        boxShadow: "none",
        textAlign: "center",
        cursor: "pointer",
        padding: theme.spacing(5, 0),
        ":hover": {
          boxShadow: `0 0 2px 0 ${shadowColor}, 0 16px 32px -4px ${shadowColor}`,
        },
        // backgroundColor: badge === BADGE_STATUS.COMING_SOON && theme.palette.background.disabled,
      }}
    >
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          width: theme.spacing(8),
          height: theme.spacing(8),
          justifyContent: "center",
          marginBottom: theme.spacing(3),
          color: theme.palette.primary.main,
          backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0
          )} 0%, ${alpha(theme.palette.secondary.main, 0.24)} 100%)`,
        }}
      >
        {icon || <PeopleAlt />}
      </Box>

      {badge && (
        <Box sx={{ display: "block", position: "absolute", top: 0, right: 0 }}>
          <Chip sx={{ m: 1 }} label={badge} color="primary" />
        </Box>
      )}
      <Stack>
        <Typography variant="h4">{count}</Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          {label}
        </Typography>
      </Stack>
    </Card>
  );
};

export default StatCard;

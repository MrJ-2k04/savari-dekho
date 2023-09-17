import MinimalFooter from "../Minimal/MinimalFooter";
import { Grid, styled } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "Store/constants";
import Animate from "Components/Other/Animate";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "Store/selectors";


const RootStyle = styled("div")({
  display: "flex",
  // flexDirection: "column",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  overflow: "auto",
  minHeight: "100vh",
  paddingTop: APP_BAR_MOBILE + 24,
  [theme.breakpoints.up("sm")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
  },
}));

const AdminLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector(selectUser);

  return (
    <RootStyle>
      <AdminNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <AdminSidebar
        isOpenSidebar={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        user={user}
      />
      <MainStyle>
        <Grid flexGrow={1}>
          <Animate>
            {children}
          </Animate>
        </Grid>
        <MinimalFooter />
      </MainStyle>
    </RootStyle >
  );
};


export default AdminLayout;

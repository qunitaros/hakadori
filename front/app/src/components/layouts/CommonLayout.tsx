import React, { useContext } from "react";

import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import Header from "./Header";
import BottomBar from "./BottomBar";
import BackToTopButton from "../atoms/buttons/BackToTopButton";
import { AuthContext } from "../../App";

const StyledContainer = styled(Container)(() => ({
  paddingTop: "3rem",
  paddingBottom: "6rem",
}));

const StyledMain = styled("main")(() => ({
  marginTop: "3rem",
}));

interface CommonLayoutProps {
  children: React.ReactNode;
}

// サインイン中共通のレイアウト
const CommonLayout = React.memo(({ children }: CommonLayoutProps) => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <StyledMain>
        {isSignedIn ? (
          <>
            <StyledContainer>
              <Grid container justifyContent="center">
                {children}
              </Grid>
            </StyledContainer>
          </>
        ) : (
          <>{children}</>
        )}
        <BackToTopButton />
      </StyledMain>
      <footer>
        <BottomBar />
      </footer>
    </>
  );
});

export default CommonLayout;

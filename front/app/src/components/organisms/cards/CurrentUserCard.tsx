import React, { useContext } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LargeAvatar from "../../atoms/avatars/LargeAvatar";
import SettingIcon from "../../atoms/icons/SettingIcon";
import SignOutButton from "../../atoms/buttons/SignOutButton";
import { HomeContext } from "../../pages/Home";
import UserProfileContent from "../../atoms/contents/UserProfileContent";
import UserProfileName from "../../atoms/titles/UserProfileName";
import { AuthContext } from "../../../App";

const StyledCard = styled(Card)(() => ({
  width: "80%",
  marginBottom: "3rem",
  backgroundColor: "#f5f5f5",
}));

const CurrentUserProps = React.memo(() => {
  const {
    setEditFormOpen,
    currentUserAge,
    currentUserPrefecture,
    currentUserField,
    currentUserDayOff,
    handleSignOut,
    currentUser,
  } = useContext(HomeContext);

  const { guestUser, setGuestDialogOpen } = useContext(AuthContext);

  const onClickSettingIcon = () => {
    return guestUser ? setGuestDialogOpen(true) : setEditFormOpen(true);
  };

  return (
    <StyledCard>
      <CardContent>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <SettingIcon onClick={() => onClickSettingIcon()} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <LargeAvatar imageUrl={currentUser?.image.url} />
        </Grid>
        <UserProfileName
          userName={currentUser?.name}
          userGender={currentUser?.gender}
        />
        <UserProfileContent
          age={currentUserAge()}
          prefecture={currentUserPrefecture()}
          field={currentUserField()}
          dayOff={currentUserDayOff()}
          profile={currentUser?.profile}
        />
        <SignOutButton onClick={handleSignOut}>ログアウト</SignOutButton>
      </CardContent>
    </StyledCard>
  );
});

export default CurrentUserProps;

import React, { useContext, createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import BottomBarButton from "../atoms/buttons/BottomBarButton";
import { AuthContext } from "../../App";
import PostCreateDialog from "../organisms/dialogs/PostCreateDialog";
import AlertMessage from "../utils/AlertMessage";
import usePost from "../../lib/hooks/usePosts";

export const PostCreateContext = createContext(
  {} as {
    createPostFormOpen: boolean;
    setCreatePostFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    alertMessageOpen: boolean;
    setAlertMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postField: number;
    setPostField: React.Dispatch<React.SetStateAction<number>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: any;
    postPreview: string;
    setPostPreview: React.Dispatch<React.SetStateAction<string>>;
    postImage: string;
    setPostImage: React.Dispatch<React.SetStateAction<string>>;
    uploadPostImage: any;
    previewPostImage: any;
  }
);

const BottomBar = React.memo(() => {
  const { isSignedIn } = useContext(AuthContext);
  const {
    createPostFormOpen,
    setCreatePostFormOpen,
    alertMessageOpen,
    setAlertMessageOpen,
    postField,
    setPostField,
    content,
    setContent,
    handleSubmit,
    createSuccessOpen,
    setCreateSuccessOpen,
    postPreview,
    postImage,
    setPostImage,
    setPostPreview,
    uploadPostImage,
    previewPostImage,
  } = usePost();

  return (
    <PostCreateContext.Provider
      value={{
        createPostFormOpen,
        setCreatePostFormOpen,
        alertMessageOpen,
        setAlertMessageOpen,
        postField,
        setPostField,
        content,
        setContent,
        handleSubmit,
        postPreview,
        setPostPreview,
        postImage,
        setPostImage,
        uploadPostImage,
        previewPostImage,
      }}
    >
      <AppBar
        position={isSignedIn ? "fixed" : "relative"}
        sx={{
          top: "auto",
          bottom: 0,
          color: "#000456",
          backgroundColor: "#eee",
        }}
      >
        <Toolbar>
          {isSignedIn ? (
            <BottomBarButton onClick={() => setCreatePostFormOpen(true)} />
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <PostCreateDialog />
      <AlertMessage // ??????????????????????????????????????????????????????
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="??????????????????????????????"
      />
      <AlertMessage
        open={createSuccessOpen}
        setOpen={setCreateSuccessOpen}
        severity="success"
        message="??????????????????????????????"
      />
    </PostCreateContext.Provider>
  );
});

export default BottomBar;

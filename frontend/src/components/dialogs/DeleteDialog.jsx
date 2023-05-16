import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteShop } from "../../features/shops/shopSlice";

// Material UI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteDialog({ shop }) {
  const dispatch = useDispatch();

  // Material UI
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    setOpen(false);
    dispatch(deleteShop(shop.shopID));
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={handleOpen}
        size="large"
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All data will be lost! Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteDialog;

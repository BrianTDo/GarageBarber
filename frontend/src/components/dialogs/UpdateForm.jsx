import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateShop } from "../../features/shops/shopSlice";
import states from "../States";

// Material UI
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

function UpdateForm({shop}) {
  const [FormData, setFormData] = useState({
    id: shop.shopID,
    name: shop.name,
    address: shop.address,
    city: shop.city,
    state: shop.state,
    zipcode: shop.zipcode,
    phone: shop.phone,
    active: shop.active,
    description: shop.description,
  });

  const { id, name, address, city, state, zipcode, phone, active, description } = FormData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onCheck = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const shopData = {
      id,
      name,
      address,
      city,
      state,
      zipcode,
      phone,
      active,
      description,
    };
    dispatch(updateShop(shopData));
  };

  // Material UI
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var activeBoolean = true;
  if (shop.active === 0){
    activeBoolean = false;
  }

  return (
    <>
      <Button color="success" variant="contained" onClick={handleOpen} size='large'>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <DialogContentText>
              Please complete all fields!
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Shop Name"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your shop name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Address"
                  id="address"
                  name="address"
                  value={address}
                  placeholder="Enter your shop address"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  type="text"
                  label="City"
                  id="city"
                  name="city"
                  value={city}
                  placeholder="Enter your shop city"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  select
                  margin="dense"
                  type="text"
                  label="State"
                  id="state"
                  name="state"
                  value={state}
                  onChange={onChange}
                >
                  {states.map((state) => (
                <MenuItem key={state} value={state} >
                  {state}
                </MenuItem>
              ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Zip Code"
                  id="zipcode"
                  name="zipcode"
                  value={zipcode}
                  placeholder="Enter your shop zipcode"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Phone"
                  id="phone"
                  name="phone"
                  value={phone}
                  placeholder="Enter your phone number"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="Active"
                  control={
                    <Switch
                      id="active"
                      name="active"
                      value={active}
                      onChange={onCheck}
                      color="primary"
                      defaultChecked={activeBoolean}
                    />
                  }
                  label="Active"
                  labelPlacement="top"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  margin="dense"
                  type="text"
                  label="Description"
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter Shop Description"
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default UpdateForm;

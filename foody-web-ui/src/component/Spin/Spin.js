import { Backdrop, CircularProgress } from "@mui/material";

const Spin = (props) => {
  const { state } = props;
  return (
    <Backdrop
      sx={{ color: "#bc412b", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={state}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default Spin;

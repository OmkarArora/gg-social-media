import { Snackbar, Alert as ShotoAlert } from "shoto-ui";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "./alertSlice";

export const Alert = () => {
  const dispatch = useDispatch();
  const { openStatus, type, data } = useSelector((state) => state.alert);

  return (
    <Snackbar
      onClose={() => dispatch(closeAlert())}
      open={openStatus}
      autoHideDuration={3000}
    >
      <ShotoAlert severity={type} onClose={() => dispatch(closeAlert())}>
        {data}
      </ShotoAlert>
    </Snackbar>
  );
};

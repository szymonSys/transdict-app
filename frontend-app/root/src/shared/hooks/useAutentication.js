import useLoad from "./useLoad";
import { authenticate } from "../../actions/auth";
import store from "../../store";

export default function useAuthentication() {
  return useLoad(
    {
      callback: store.dispatch,
      initState: store.getState().auth.isAuthenticated,
    },
    authenticate()
  );
}

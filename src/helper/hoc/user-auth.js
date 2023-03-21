import { useSelector } from "react-redux";

export function useAuth() {
  const { email, token, id, err } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
    err,
  };
}

import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const loginHandler = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      dispatch(authActions.authenticate(token));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in, Please check your credentials or try again later"
      );
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOverlay message="Login ..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

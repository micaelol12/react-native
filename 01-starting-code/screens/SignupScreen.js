import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/authSlice";

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const Signup = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      dispatch(authActions.authenticate(token));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input and try again later."
      );
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={Signup} />;
}

export default SignupScreen;

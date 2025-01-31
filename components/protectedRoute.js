import { useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};

export default ProtectedRoute;

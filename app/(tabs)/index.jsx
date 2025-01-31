import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";  // Same import for login action
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    } else {
      Alert.alert("Please enter both email and password.");
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigation.navigate("Home"); // Navigate to Home if authenticated
    }
  }, [auth.isAuthenticated, navigation]);

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};



const styles = StyleSheet.create({
  /* General Styling */
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff006a', // You can directly apply the gradient with `LinearGradient` if needed
    padding: 0,
    margin: 0,
  },

  /* Login */
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Center the Login Container */
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 400,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4, // For Android shadow
  },

  /* Header */
  heading: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  /* Input Fields */
  input: {
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },

  /* Focused Input */
  inputFocused: {
    borderColor: '#2575fc',
    shadowColor: '#2575fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

  /* Login Button */
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: 'linear-gradient(135deg, #ff006a, #e6005c)', // React Native uses LinearGradient component for gradients
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Button Hover Effect */
  buttonHover: {
    backgroundColor: 'linear-gradient(135deg, #e6005c, #ff006a)', // You may handle hover in the web version
  },

  /* Button Active Effect */
  buttonActive: {
    transform: [{ scale: 1 }],
  },

  /* Add Placeholder Styling */
  placeholder: {
    color: '#999',
  },

  /* Add Error Message Styling */
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});



export default Login;

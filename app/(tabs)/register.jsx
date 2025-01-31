import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
//import LinearGradient from 'react-native-linear-gradient'; // You need to install this for gradients
import { StyleSheet } from 'react-native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  // Assuming `auth.isAuthenticated` exists in your Redux state
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigation.replace('Home'); // Replace with your home screen name
    }
  }, [auth.isAuthenticated, navigation]);

  return (
    <View style={styles.registerContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
       
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff006a', // Background gradient in body for web
  },
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
  heading: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
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
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: 'linear-gradient(135deg, #ff006a, #e6005c)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;

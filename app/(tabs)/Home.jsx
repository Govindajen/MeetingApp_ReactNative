import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native"; 
import { fetchAllUsers } from "../../redux/slices/fetchSlice";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const bddUsers = useSelector((state) => state.users.allUsers);

  const [currentIndex, setCurrentIndex] = useState(0); // Track current user index

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Text style={styles.loadingText}>Please log in first...</Text>;
  }

  const handleLike = () => {
    navigation.navigate("Chat"); // Navigate to chats when the user likes
  };

  const handleDislike = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bddUsers.length); // Move to next user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Discover New Users</Text>

      {bddUsers.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.username}>{bddUsers[currentIndex]?.username}</Text>
          <Text style={styles.info}>📧 {bddUsers[currentIndex]?.email}</Text>
          <Text style={styles.info}>🎂 Age: {bddUsers[currentIndex]?.age || "N/A"}</Text>
          <Text style={styles.info}>💼 {bddUsers[currentIndex]?.profession || "N/A"}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading users...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDislike} style={[styles.button, styles.dislike]}>
          <Text style={styles.buttonText}>❌ Nope</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} style={[styles.button, styles.like]}>
          <Text style={styles.buttonText}>💖 Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // General Styling
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6B81",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  // Tinder Card
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: 300,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },

  // Tinder Buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dislike: {
    backgroundColor: "#333",
  },
  like: {
    backgroundColor: "#FF6B81",
  },
});

export default Home;

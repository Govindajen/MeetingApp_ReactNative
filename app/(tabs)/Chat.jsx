import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [wsControlleur, setWSControlleur] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");

    ws.onopen = () => {
      setWSControlleur(ws);
      ws.send(JSON.stringify({ type: "connection", userId: user.user.id }));

      ws.onmessage = (message) => {
        const body = JSON.parse(message.data);
        if (body.type === "onlineUsers") {
          setOnlineUsers(body.users);
        }

        if (body.type === "newMessage") {
          setMessages((prevMessages) => [...prevMessages, { message: body.message, username: body.username, with: body.with }]);
        }
      };
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "close", userId: user.user.id }));
        ws.close();
      }
    };
  }, [user.user.id]);

  const handleSendMessage = () => {
    wsControlleur.send(JSON.stringify({ type: "newMessage", userId: user.user.id, message: newMessage, with: selectedUser }));
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.usersListContainer}>
        <FlatList
          horizontal
          data={onlineUsers.filter((userOnline) => userOnline.username !== user.user.username)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem} onPress={() => setSelectedUser(item)}>
              <Text style={styles.userName}>{item.username}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.chatContainer}>
        {selectedUser ? (
          <FlatList
            data={messages.filter(
              (message) =>
                (message.username === user.user.username && message.with.id === selectedUser.id) ||
                (message.username === selectedUser.username && message.with.id === user.user.id)
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.username === user.user.username ? styles.myMessage : styles.myMessage2]}>
                {item.username !== user.user.username && <Text style={styles.username}>{item.username[0].toUpperCase()}</Text>}
                <Text style={styles.message}>{item.message}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.startMessageText}>Select a user to start chatting.</Text>
        )}

        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            editable={!!selectedUser}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage} disabled={!selectedUser}>
            <Text style={styles.sendBtnText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B81',
    padding: 10,
    borderWidth: 10,
    borderColor: '#000',
  },
  usersListContainer: {
    height: 60,
    backgroundColor: '#2c3e50',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  userItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1da1f2',
    marginHorizontal: 5,
  },
  userName: {
    fontSize: 16,
    color: 'white',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50, // Increased height
  },
  sendBtn: {
    backgroundColor: '#FF3E6C',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  sendBtnText: {
    fontSize: 18,
    color: 'white',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF5864',
    padding: 10,
    borderRadius: 15,
    maxWidth: '70%',
  },
  myMessage2: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    padding: 10,
    borderRadius: 15,
    maxWidth: '70%',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 5,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
  startMessageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

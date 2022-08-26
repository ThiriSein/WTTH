import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";

const UserList = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("users");

    const [id, setId] = useState("");
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    dataRef
    .where('role', '==', 'Client')
      //.orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { username } = doc.data();
        const { email } = doc.data();
        const { phone } = doc.data();
        const { address } = doc.data();

        data.push({
          id: doc.id,
          username,
          email,
          phone,
          address,
        });
      });
      setData(data);
    });
  };


  return (
    <View>
      <View style={styles.container}>
        <View>
           <Text style={styles.adminText}>View All Users</Text>
        </View>

        <View style={{ flex: 2, padding: 10 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.Box}>
                <View>
                  <Text style={ styles.padd }>
                     {item.username}
                  </Text>
                </View>
                
                  <View>
                    <Text style={styles.text}>
                      UserID : {item.id}
                    </Text>
                    <Text style={styles.text}>
                     UserEmail : {item.email}
                    </Text>
                    
                    <Text style={styles.text}>
                      User Phone : {item.phone}
                    </Text>
                    <Text style={styles.text}>
                     User Address : {item.address}
                    </Text>
                  </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  adminText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 10
  },
  padd: {
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
  Box: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
    padding : 10
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
});

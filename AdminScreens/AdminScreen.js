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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";

const Admin = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("products");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [category_name, setCategory_name] = useState('');

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    dataRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { imgURL } = doc.data();
        const { name } = doc.data();
        const { desc } = doc.data();
        const { price } = doc.data();
        const { category_name } = doc.data();

        data.push({
          id: doc.id,
          imgURL,
          name,
          desc,
          price,
          category_name,
        });
      });
      setData(data);
    });
  };

  // delete data
  const destroy = (data) => {
    dataRef
      .doc(data.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully!");
        console.log(" Data Deleted");
      })
      .catch((error) => {
        alert("error");
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.adminView}>
        <Image
        style={styles.tinyLogo}
        source={require('../assets/logo.png')}
          />
         
           <Text style={styles.adminText}>Add All Products</Text>
          <TouchableOpacity
            style={{backgroundColor: "gold", padding: 20,borderRadius: 40  }}
            onPress={() => navigation.navigate("CreateProduct")}
          >
            <MaterialCommunityIcons name="plus" size={30} color={"black"} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, padding: 10, paddingTop: 0 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View
                style={styles.Box}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("UpdateProduct", { item })
                    }
                  >
                    <MaterialCommunityIcons
                      name="lead-pencil"
                      size={30}
                      color="gold"
                    />
                  </TouchableOpacity>

                  <Text style={ styles.padd }>
                     {item.category_name}
                    </Text>


                  <TouchableOpacity onPress={() => destroy(item)} style={{left: 70,}}>
                    <Ionicons name="trash" color={"#ffd700"} size={30} />
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <View>
                    <Image
                      style={styles.iimage}
                      source={{ uri: item.imgURL }}
                    />
                  </View>
                  <View style={{   padding: 10,  }}>
                    <Text style={styles.text}>
                      {/*Name:*/}
                      {item.name}
                    </Text>
                    
                    <Text style={[styles.text, styles.decText]}>
                      {/*Description:*/}
                      {item.desc}
                    </Text>
                    <Text style={styles.text}>
                      Price: ${item.price}
                    </Text>
                    
                  </View>
                 
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
//  button: {
//    width: "100%",
//    backgroundColor: "gold",
//    width: "40%",
//    padding: 8,
//    marginLeft: 20,
//    marginRight: 30,
//    borderRadius: 5,
//    color: "#000",
//    justifyContent: "center",
//    alignItems: "center",
//    flexDirection: "row",
//  },
// 
  adminView: {
    padding: 13,
    flexDirection: "row",
  },
  adminText: {
    fontSize: 20,
    color: "white",
    ontWeight: "500",
    letterSpacing: 1,
    paddingLeft: 22,
    paddingTop: 30,
    paddingRight: 22,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    paddingBottom: 5,
    fontWeight: "500",
    letterSpacing: 1,
    width: 150,
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  padd: {
    width: 100,
     marginLeft: '30%',
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
  },
  Box: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 18
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
  }
});

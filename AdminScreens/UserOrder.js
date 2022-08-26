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

const UserOrder = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')
  //.doc("client " + urname).collection("cart " + uid);

  // read data
  const read = () => {
    console.log("inside read function");
    dataRef
      .onSnapshot((querySnapshot) => {
        const data = [];
        //console.log("Data", querySnapshot.docs.data());
        querySnapshot.forEach((doc) => {
          console.log("Data = ", doc.data());
          data.push(doc.data());
          const { address } = doc.data();
          const { cartList } = doc.data();
          const { phone } = doc.data();
          const { total } = doc.data();
          const { username } = doc.data();
          setCartList(doc.data().cartList);
          console.log("arr obj=" + cartList);
          //data.push({
          //  id: doc.id,
          //  address,
          //  cartList,
          //  phone,
          //  total,
          //  username,
          //});
        });
        setData(data);
      });
    console.log(" data Data = ", data);
  };
  useEffect(() => {
    read();
  }, []);


  return (
    <View style={{ flex: 1, }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', }}>OrderDetail</Text>
  
      <FlatList
        data={data}
        showsVerticalScrollIndicator={true}
        style={{ flex: 1, marginTop: 16 }}
        renderItem={({ item }) => (
          <View>
            
            {
              item.cartList.map((cartItem) => {
                console.log("cart Item",cartItem)
                return (
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                  <Text>{cartItem.qty} x</Text>
                    <Text>{cartItem.name}</Text>
                    <Text>$ {cartItem.price}</Text>
                </View>
                )
              }
              )
            }
  
            
            <View style={{ flex: 0.5,borderWidth: 1,borderColor:'#000',marginTop: 10 }}>
              <ScrollView>
                  <View>
                      {/*<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold' }}>Information</Text>*/}
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Name</Text>
                          <Text>{item.username}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Phone</Text>
                          <Text>{item.phone}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Address</Text>
                          <Text>{item.address}</Text>
                      </View>
                      {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Note</Text>
                          <TextInput
                              style={styles.textBoxes}
                              placeholder='Message'
                              onChangeText={(note) => setNote(note)}
                              placeholderTextColor="#c4c4c2"
                          />
                      </View>*/}
                  </View>
                      {/*<Text style={{fontSize: 20,fontWeight:'bold',color: 'gold'}}>Check Out</Text>*/}
                      
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                          <Text>Total</Text>
                          <Text>$ {item.total}</Text>
                      </View>
                  </ScrollView>
              </View>
         
            {/*<Text>Address: {item.address}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Total Price: {item.total}</Text>
            <Text>Name : {item.username}</Text>*/}
              </View>
            )}
        />
      </View>
    
  );
}
export default UserOrder;

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

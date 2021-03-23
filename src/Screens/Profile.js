/** @format */

import {
  Body,
  Card,
  CardItem,
  Container,
  Left,
  Right,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase";
const Profile = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = firebase.default.firestore();
  const auth = firebase.default.auth();
  var curruntUser = auth.currentUser;
  const userData = () => {
    setLoading(true);
    var arr = [];
    db.collection("user")
      .doc(curruntUser.uid)
      .onSnapshot(e => {
        arr.push(e.data());
        var strify = JSON.stringify(arr);
        var pars = JSON.parse(strify);
        setData(pars);
        setLoading(false);
      });
  };
  useEffect(() => {
    userData();
  }, []);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        alert("Logout");
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <>
      <Container>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}>
            <Text style={{ textAlign: "center" }}>Loading.....</Text>
          </View>
        ) : null}

        {data.map(value => {
          return (
            <View style={styles.card} key={value.Id} >
              <Card transparent>
                <CardItem style={styles.CardItem1}>
                  <Body>
                    <View
                      style={{
                        alignSelf: "center",
                        position: "relative",
                        bottom: 0,
                        width: 70,
                        backgroundColor: "red",
                        borderRadius: 100,
                      }}>
                      <Text style={{ textAlign: "center" }}>
                        <FontAwesome name='user' size={44} color='white' />
                      </Text>
                    </View>
                  </Body>
                </CardItem>
                <CardItem style={styles.CardItem2}>
                  <Left>
                    <Body>
                      <Text style={styles.cardText}>Name</Text>
                    </Body>
                  </Left>
                  <Body>
                    <Text>{value.Name}</Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.CardItem2}>
                  <Left>
                    <Body>
                      <Text style={styles.cardText}>Email</Text>
                    </Body>
                  </Left>
                  <Body>
                    <Text>{value.Email}</Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.CardItem2}>
                  <Left>
                    <Body>
                      <Text style={styles.cardText}>Phone Number</Text>
                    </Body>
                  </Left>
                  <Body>
                    <Text>{value.PhoneNo}</Text>
                  </Body>
                </CardItem>
                <CardItem style={styles.CardItem3}>
                  <Left>
                    <Body>
                      <TouchableOpacity>
                        <Text style={{ marginLeft: 30 }}>
                          <AntDesign name='edit' size={34} color='green' />
                        </Text>
                      </TouchableOpacity>
                    </Body>
                  </Left>
                  <Right>
                    <Body>
                      <TouchableOpacity>
                        <Text>
                          <AntDesign name='delete' size={34} color='red' />
                        </Text>
                      </TouchableOpacity>
                    </Body>
                  </Right>
                </CardItem>
              </Card>
            </View>
          );
        })}
        <Button
          block
          onPress={logOut}
          style={{
            marginTop: 20,
            width: "80%",
            alignSelf: "center",
          }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
            Logout
          </Text>
        </Button>
      </Container>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    overflow: "hidden",
    elevation: 5,
    borderRadius: 40,
  },
  cardText: {
    fontWeight: "bold",
    color: "#757575",
    fontSize: 16,
  },
  CardItem1: {
    borderTopWidth: 3,
    borderColor: "red",
    borderLeftWidth: 3,
    borderTopLeftRadius: 40,
    borderRightWidth: 3,
    borderTopRightRadius: 40,
    borderTopWidth: 0,
  },

  CardItem2: {
    borderRightWidth: 8,
    borderLeftWidth: 8,
    borderColor: "yellow",
  },
  CardItem3: {
    borderColor: "red",
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomWidth: 0,
  },
});

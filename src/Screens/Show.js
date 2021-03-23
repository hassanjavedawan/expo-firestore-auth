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
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import firebase from "../config/firebase";

function Show({ navigation }) {
  const db = firebase.default.firestore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    var arr = [];
    db.collection("user").onSnapshot(e => {
      e.docChanges().forEach(change => {
        if (change.type === "added") {
          arr.push(change.doc.data());
          var strify = JSON.stringify(arr);
          var pars = JSON.parse(strify);
          setData(pars);
          setLoading(false);
        }
        if (change.type === "modified") {
          console.log("modofi", pars);
        }
        if (change.type === "removed") {
          console.log("remove", pars);
        }
      });
    });
  };

  console.log("bhi ma state sa a raha hon", data);
  useEffect(() => {
    getData();
  }, []);

  // delete ka finction bna hoa ha...
  const deleteData = id => {
    db.collection("user")
      .doc(id)
      .delete()
      .then(() => {
        alert("data has delete");
        getData();
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <>
      <StatusBar style='light' />
      <Container style={{ backgroundColor: "whitesmoke" }}>
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
        <ScrollView>
          {data.map(value => {
            return (
              <View style={styles.card} key={value.Id}>
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
                  <CardItem style={styles.CardItem2}>
                    <Left>
                      <Body>
                        <Text style={styles.cardText}>User UID</Text>
                      </Body>
                    </Left>
                    <Body>
                      <Text>{value.Id}</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={styles.CardItem3}>
                    <Left>
                      <Body>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Update", {
                              myName: value.Name,
                              myEmail: value.Email,
                              myPhoneNo: value.PhoneNo,
                              myId: value.Id,
                            })
                          }>
                          <Text style={{ marginLeft: 30 }}>
                            <AntDesign name='edit' size={34} color='green' />
                          </Text>
                        </TouchableOpacity>
                      </Body>
                    </Left>
                    <Right>
                      <Body>
                        <TouchableOpacity onPress={() => deleteData(value.Id)}>
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
        </ScrollView>
      </Container>
    </>
  );
}

export default Show;

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

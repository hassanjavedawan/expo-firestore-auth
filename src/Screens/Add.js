/** @format */

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Toast,
} from "native-base";
function Add({ navigation }) {
  const [name, setName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const db = firebase.default.firestore();
  // const id = db.collection("user").doc().id;
  //   console.log(id);
  const auth = firebase.default.auth();

  const setData = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(e => {
        var user = e.user;
        alert("user add");
        let data = {
          Name: name,
          PhoneNo: phoneNo,
          Email: email,
          Password: password,
          Id: user.uid,
        };
        db.collection("user")
          .doc(user.uid)
          .set(data)
          .then(() => {
            alert("data has successfuly added");
            navigation.navigate("Show");
          })
          .catch(err => {
            alert(err);
          });
        console.log(data);
        setName("");
        setPhoneNo("");
        setEmail("");
        setPassword("");
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <>
      <Container>
        <Form style={styles.forms}>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input
              value={name}
              keyboardType='default'
              onChangeText={e => setName(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Phone No</Label>
            <Input
              value={phoneNo}
              keyboardType='phone-pad'
              onChangeText={e => setPhoneNo(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              value={email}
              keyboardType='email-address'
              onChangeText={e => setEmail(e)}
            />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input
              value={password}
              secureTextEntry={true}
              onChangeText={e => setPassword(e)}
            />
          </Item>
          <Button
            block
            onPress={setData}
            style={{
              marginTop: 20,
              width: "80%",
              backgroundColor: "orange",
              alignSelf: "center",
            }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
              Sign up
            </Text>
          </Button>
          <Button
            block
            onPress={() => navigation.navigate("Show")}
            style={{
              marginTop: 20,
              width: "80%",
              backgroundColor: "green",
              alignSelf: "center",
            }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
              show Data
            </Text>
          </Button>

          <Button
            block
            onPress={() => navigation.navigate("Login")}
            style={{
              marginTop: 20,
              width: "80%",
              alignSelf: "center",
            }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
              Login
            </Text>
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Add;

const styles = StyleSheet.create({
  forms: {
    width: "80%",
    alignSelf: "center",
    marginTop: 59,
  },
});

/** @format */

import { Button, Container, Form, Input, Item, Label } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../config/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const auth = firebase.default.auth();

  const userLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("user login");
        navigation.replace("Profile");
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
            <Label>Email</Label>
            <Input
              value={email}
              keyboardType='email-address'
              onChangeText={e => setEmail(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Password</Label>
            <Input
              value={password}
              secureTextEntry={true}
              onChangeText={e => setPassword(e)}
            />
          </Item>
          <Button
            block
            onPress={userLogin}
            style={{
              marginTop: 20,
              width: "80%",
              backgroundColor: "green",
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
};

export default Login;

const styles = StyleSheet.create({
  forms: {
    width: "80%",
    alignSelf: "center",
    marginTop: 80,
  },
});

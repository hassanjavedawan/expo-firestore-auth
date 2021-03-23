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
} from "native-base";
function Update(props) {
  const { myId, myName, myEmail, myPhoneNo } = props.route.params;

  const [name, setName] = useState(myName);
  const [phoneNo, setPhoneNo] = useState(myPhoneNo);
  const [email, setEmail] = useState(myEmail);

  const db = firebase.default.firestore();

  const updateData = () => {
    let data = {
      Name: name,
      PhoneNo: phoneNo,
      Email: email,
    };
    db.collection("user")
      .doc(myId)
      .update(data)
      .then(() => {
        props.navigation.replace("Show");
        alert("data has updated");
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
            <Label>Update Username</Label>
            <Input
              value={name}
              keyboardType='default'
              onChangeText={e => setName(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Update Phone No</Label>
            <Input
              value={phoneNo}
              keyboardType='phone-pad'
              onChangeText={e => setPhoneNo(e)}
            />
          </Item>
          <Item stackedLabel>
            <Label>Update Email</Label>
            <Input
              value={email}
              keyboardType='email-address'
              onChangeText={e => setEmail(e)}
            />
          </Item>

          <Button
            block
            onPress={updateData}
            style={{
              marginTop: 20,
              width: "80%",
              backgroundColor: "orange",
              alignSelf: "center",
            }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
              Update
            </Text>
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Update;

const styles = StyleSheet.create({
  forms: {
    width: "80%",
    alignSelf: "center",
    marginTop: 59,
  },
});

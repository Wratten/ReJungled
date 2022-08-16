import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

// Picture part of card, could use for a photo?
const LeftContent = () => (
  <Avatar.Image size={48} source={require("../assets/images/monkey.png")} />
);

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function Post({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          This should be a post
        </Text>
      </View>
      {/* this is a card? */}
      <Card>
        <Card.Title
          title="Post Title"
          subtitle="By Post User"
          left={LeftContent}
        />

        <Card.Content>
          <Paragraph>Post content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Comments</Button>
          <Button>Upvote</Button>
          <Button>Downvote</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
});

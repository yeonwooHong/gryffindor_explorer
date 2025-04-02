import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Animated, Alert, StyleSheet  } from "react-native";
import { useDispatch } from "react-redux";
import { addFavCharacter } from "../redux/actions";

const DetailsScreen = ({ route }) => {
    const { character } = route.params;
    const dispatch = useDispatch();

    // const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0);

    const [imageExists, setImageExists] = React.useState(true);

    const onImageError = () => {
        setImageExists(false);
    };

    const handleAddToFavorites = async () => {
      const success = await dispatch(addFavCharacter(character));

      if (success){
        Alert.alert("Success", "Character successfully added to favorites!");
      } else {
        Alert.alert("Fail", "Character already exists in favorites.");
      }
  };

    // React.useEffect(() => {
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 1000,
    //         useNativeDriver: true,
    //     }).start();
    // }, []);
    useEffect(() => {
      Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,  // Adjust friction for smoothness
          tension: 10,   // Controls how bouncy the animation is
          useNativeDriver: true,
      }).start();
  }, []);

  return (
    <View style={styles.container}>
        {imageExists ? (
            <Animated.Image
                source={{ uri: character.image }}
                style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
                onError={onImageError}
            />
        ) : (
            <Text style={styles.noImageText}>Image does not exist</Text>
        )}
        <Text style={styles.characterName}>{character.name}</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.characterInfo}>Year of Birth: {character.yearOfBirth || "N/A"}</Text>
            <Text style={styles.characterInfo}>Ancestry: {character.ancestry || "N/A"}</Text>
            <Text style={styles.characterInfo}>Wand: {character.wand?.core || "N/A"}</Text>
            <Text style={styles.characterInfo}>Patronus: {character.patronus || "N/A"}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Add to Favorites" onPress={handleAddToFavorites} />
        </View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f4f4f8",
  },
  image: {
      width: 220,
      height: 220,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: "#ddd",
  },
  noImageText: {
      fontSize: 18,
      color: "gray",
      fontStyle: "italic",
  },
  characterName: {
      fontSize: 26,
      fontWeight: "bold",
      marginTop: 10,
      color: "#333",
  },
  infoContainer: {
      marginTop: 15,
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      width: "90%",
      alignItems: "center",
  },
  characterInfo: {
      fontSize: 16,
      marginVertical: 4,
      color: "#555",
  },
  buttonContainer: {
      marginTop: 20,
      width: "90%",
  },
});

export default DetailsScreen;


import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../redux/actions";


const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters).characters;

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  return (
    <View style={styles.container}>
      {
        (characters && (characters.length > 0)) ? (
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (

              <TouchableOpacity
                style={styles.characterItem}
                onPress={() => navigation.navigate("Details", { character: item })}>
                <Text style={styles.characterText}>{item.name}</Text>
              </TouchableOpacity>

            )}
          />
        ) : (
          <Text style={styles.noCharactersText}>No characters</Text>
        )}
      <Button title="Go to Favorites" onPress={() => navigation.navigate("FavCharacters")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  characterItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  characterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noCharactersText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
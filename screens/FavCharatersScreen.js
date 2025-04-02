import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchFavCharacters } from "../redux/actions";

const FavCharactersScreen = () => {
    const [favCharacters, setFavCharacters] = useState([]);

    useEffect(() => {
        fetchFavCharacters(setFavCharacters);
    }, []);

    return (
        <View style={styles.container}>
            {favCharacters.length > 0 ? (
                <FlatList
                    data={favCharacters}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.characterName}>{item.name}</Text>
                            <Text style={styles.characterInfo}>Year of Birth: {item.yearOfBirth || "N/A"}</Text>
                            <Text style={styles.characterInfo}>Ancestry: {item.ancestry || "N/A"}</Text>
                            <Text style={styles.characterInfo}>Wand: {item.wand?.core || "N/A"}</Text>
                            <Text style={styles.characterInfo}>Patronus: {item.patronus || "N/A"}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noFavoritesText}>No favorite characters yet!</Text>
            )}
        </View>
    );
};

// ✅ Styled with StyleSheet for a cleaner look
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f4f8",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    characterName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    characterInfo: {
        fontSize: 16,
        color: "#555",
        marginVertical: 2,
    },
    noFavoritesText: {
        textAlign: "center",
        fontSize: 18,
        color: "#888",
        marginTop: 20,
    },
});

export default FavCharactersScreen;

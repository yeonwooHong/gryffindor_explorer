import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavCharactersScreen from '../screens/FavCharatersScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  const headerOptions = ({ navigation }) => (
    {
      // headerStyle: {
      //   backgroundColor: '#2D336B'
      // },
      // headerTintColor: '#FFF2F2',
      // headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          title="Favs"
          onPress={() => navigation.navigate('FavCharacters')}
        />
      )
    }
  )

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group screenOptions={headerOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home Screen' }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Details' }}
          />
          <Stack.Screen
            name="FavCharacters"
            component={FavCharactersScreen}
            options={{ title: 'Favorite Characters' }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import styles from './style';

export default function Main( { navigation } ) {

  const [ currentRegion, setCurrentRegion ] = useState( null )

  useEffect( () => {
    loadInitialLocation()
  }, [] )

  const loadInitialLocation = async () => {
    const { granted } = await requestPermissionsAsync()

    if( granted ) {
      const { coords } = await getCurrentPositionAsync( {
        enableHighAccuracy: true
      } )

      const { latitude, longitude } = coords
      setCurrentRegion( {
        latitude,
        longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      } )
    }
  }

  if( !currentRegion ) {
    return <ActivityIndicator style={ { flex: 1 } } size="large" color="#7D40E7"/>
  }

  return (
    <>
      <MapView   
        style={ styles.map }
        initialRegion={ currentRegion } 
      >
        <Marker coordinate={ { latitude: -23.789300, longitude: -46.683350 } }>
          <Image 
            style={ styles.avatar }
            source={ { uri: 'https://avatars3.githubusercontent.com/u/23706132?s=460&v=4' } }
          />
          <Callout onPress={ () => { 
            navigation.navigate( 'Profile', { github_username: 'diego3g' } ) 
          } }>
            <View style={ styles.callout }>
              <Text style={ styles.devName }>Gui Silva</Text>
              <Text  style={ styles.devBio }>Minha Bio Maravilhosa</Text>
              <Text  style={ styles.devTechs }>ReactJS, React Native, NodeJS</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={ styles.searchForm }>
        <TextInput 
          style={ styles.searchInput }
          placeholder="Buscar devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={ false }  
        />
        <TouchableOpacity
          style={ styles.loadButton }
          onPress={ () => {} }
        >
          <MaterialIcons name="my-location" size={20} color="#FFF"/>
        </TouchableOpacity>
      </View>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from './../../services/api'
import { connect, disconnect, subscribeToNewDevs } from './../../services/socket'

import styles from './style';

export default function Main( { navigation } ) {

  const [ techs, setTechs ] = useState( '' )
  const [ devs, setDevs ] = useState( [] )
  const [ currentRegion, setCurrentRegion ] = useState( null )

  useEffect( () => {
    loadInitialLocation()
  }, [] )

  useEffect( () => {
    subscribeToNewDevs( dev => setDevs( [ ...devs, dev ] ) )
  }, [ devs ] )

  const handleRegionChanged = ( region ) => {
    setCurrentRegion( region )
  }

  const setupWebsocket = () => {
    disconnect()

    const { latitude, longitude } = currentRegion
    connect( latitude, longitude, techs )

  }

  const loadDevs = async () => {
    const { latitude, longitude } = currentRegion

    const { data } = await api.get( '/search', {
      params: { latitude, longitude, techs }
    } )

    setDevs( data )
    setTechs( '' )
    setupWebsocket()
  }

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
        onRegionChangeComplete={ handleRegionChanged }
      >
        
        { devs.map( dev => (
          <Marker 
            coordinate={ { 
              longitude: dev.location.coordinates[0], 
              latitude: dev.location.coordinates[1] 
            } }
            key={ dev._id }
          >
            <Image 
              style={ styles.avatar }
              source={ { uri: dev.avatar_url } }
            />
            <Callout onPress={ () => { 
              navigation.navigate( 'Profile', { github_username: dev.github_username } ) 
            } }>
              <View style={ styles.callout }>
                <Text style={ styles.devName }>{dev.name}</Text>
                <Text  style={ styles.devBio }>{ dev.bio }</Text>
                <Text  style={ styles.devTechs }>{ dev.techs.join( ', ' ) }</Text>
              </View>
            </Callout>
          </Marker> 
        ) ) }

      </MapView>

      <View style={ styles.searchForm }>
        <TextInput 
          style={ styles.searchInput }
          placeholder="Buscar devs por techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={ false }  
          value={ techs }
          onChangeText={ setTechs }
        />
        <TouchableOpacity
          style={ styles.loadButton }
          onPress={ loadDevs }
        >
          <MaterialIcons name="my-location" size={20} color="#FFF"/>
        </TouchableOpacity>
      </View>
    </>
  );
}

import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

export default function Profile( { route } ) {

  const { github_username } = route.params

  return (
    
    <View>
      <Text>Profile</Text>
    </View>
  )
}

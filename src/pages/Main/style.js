import { StyleSheet } from 'react-native'

const styles = StyleSheet.create( {

  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260
  },

  devName: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  devBio: {
    color: '#666'
  },

  devTechs: {
    marginTop: 5
  },

  searchForm: {
    position: 'absolute',
    flexDirection: 'row',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
} )

export default styles
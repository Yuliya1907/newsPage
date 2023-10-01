import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const SearchBar = ({onSearch, onAddNews}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
    onSearch(text);
  };

  const navigation = useNavigation();

  const navigateToAddNews = () => {
    navigation.navigate('AddNews');
  };

  return (
    <View style={styles.search}>
      <View style={styles.searchContainer}>
        <Svg viewBox="0 0 16 16" style={styles.icon}>
          <Path
            fill="black"
            fillRule="evenodd"
            d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
          />
        </Svg>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddNews}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2a1 1 0 011 1v8h8a1 1 0 010 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 010-2h8V3a1 1 0 011-1z"
            fill="#000"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    minWidth: 280,
    borderWidth: 1,
    borderColor: '#ccc',
    opacity: 0.15,
    backgroundColor: '#a4a9ae',
    borderRadius: 10,
    marginLeft: 30,
    marginBottom: 40,
  },
  input: {
    flex: 0.7,
    width: 200,
    paddingLeft: 10,
    color: 'black',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginLeft: 20,
  },
  addButton: {
    display: 'flex',
    marginLeft: 10,
    width: 48,
    height: 48,
    borderRadius: 50,
    opacity: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a4a9ae',
  },
  icon: {
    width: 24,
    height: 24,
    fill: 'blue', // Колір графіки
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
});

export default SearchBar;

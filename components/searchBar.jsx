import React, {useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg'; // Import SVG components

const SearchBar = ({onSearch, onAddNews}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
    onSearch(text); // Call the onSearch callback with the search text
  };

  return (
    <View style={styles.searchContainer}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 20.9l-5.638-5.637A8 8 0 1117.364 20.9h3.636zm-1.047-6.98a9.5 9.5 0 10-1.414-1.414L19.95 13.92z"
          fill="#000"
        />
      </Svg>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddNews}>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    flex: 0.7,
    paddingLeft: 10,
    color: 'black',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    opacity: 0.15,
    backgroundColor: '#a4a9ae',
  },
  addButton: {
    display: 'flex',
    marginLeft: 10,
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;

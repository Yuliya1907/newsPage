import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Svg, {Path} from 'react-native-svg';
import {
  StatusBar,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
// import {err} from 'react-native-svg/lib/typescript/xml';
import SearchBar from '../components/searchBar';
import NoResults from '../components/NoResults';
import TimeAgo from '../components/TimeAgo';
import Modal from 'react-native-modal';

type PostType = {
  id: number;
  title: string;
  text: string;
  image: string;
  url: string;
  active: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

const Post = styled.View`
  width: 340px;
  border-radius: 10px;
  margin: 0 auto;
  border: 0.1px solid #8e949a;
  margin-bottom: 40px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 196px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const PostTitle = styled.Text`
  font-family: Roboto;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PostText = styled.Text`
  font-family: Roboto;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px;
  margin-bottom: 5px;
`;

const PostTime = styled.Text`
  font-family: Roboto;
  color: #8e949a;
  font-size: 12px;
  font-style: normal;
  font-weight: 200;
  line-height: 17px;
`;

const ModalContainer = styled.View`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 35px;
  border-radius: 10px;
  gap: 15px;
  position: absolute;
  bottom: 0;
`;

const PostInfo = styled.View`
  padding: 18px;
`;

const LineContainer = styled.View`
  display: flex;
  justify-content: center;
`;

export const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PostType[]>([]);
  const [filteredItems, setFilteredItems] = useState<PostType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PostType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPosts = () => {
    // setIsLoading(true);
    axios
      .get<PostType[]>('')
      .then(response => {
        setItems(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchText, items]);

  const handleSearch = (searchTextValue: string) => {
    setSearchText(searchTextValue);
  };

  const handleAddNews = () => {
    // Handle the action when the add news button is pressed
    // You can implement your logic here to add news.
  };

  const handleOpenModal = (item: PostType) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDeleteNews = () => {
    if (selectedItem) {
      const index = items.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      }

      setModalVisible(false);
    }
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const modalStyles = {
    buttonContainer: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: 'red',
    },
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPosts();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <View>
      <SearchBar onSearch={handleSearch} onAddNews={handleAddNews} />
      {filteredItems.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={searchText ? filteredItems : items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleOpenModal(item)}>
              <Post key={item.id}>
                <PostImage
                  source={{
                    uri: `${item.url}`,
                  }}
                />
                <PostInfo>
                  <PostTitle>{item.title}</PostTitle>
                  <PostText>{item.text}</PostText>
                  <PostTime>
                    <TimeAgo timestamp={item.created_at} />
                  </PostTime>
                </PostInfo>
              </Post>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#8E949A" // Колір індікатора оновлення
            />
          }
        />
      )}
      <StatusBar />
      <Modal isVisible={modalVisible}>
        <ModalContainer>
          <LineContainer>
            <Svg width="41" height="8" viewBox="0 0 41 6" fill="none">
              <Path
                opacity="0.3"
                d="M2.99994 3H37.9999"
                stroke="#8E949A"
                stroke-width="8"
                stroke-linecap="round"
              />
            </Svg>
          </LineContainer>

          <View style={modalStyles.buttonContainer}>
            <Button title="Delete" onPress={handleDeleteNews} />
          </View>
          <View style={modalStyles.buttonContainer}>
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </ModalContainer>
      </Modal>
    </View>
  );
};

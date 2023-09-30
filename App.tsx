import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StatusBar, View} from 'react-native';
import styled from 'styled-components/native';
import {err} from 'react-native-svg/lib/typescript/xml';
import SearchBar from './components/searchBar';

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
  width: 360px;
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

const PostInfo = styled.View`
  padding: 18px;
`;

// const Header = styled.View`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
// `;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PostType[]>([]);
  const [filteredItems, setFilteredItems] = useState<PostType[]>([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get<PostType[]>('https://yourtestapi.com/api/posts/')
      .then(response => {
        setItems(response.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (searchText: string) => {
    // Filter the items based on the search text
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredItems(filtered);
  };

  const handleAddNews = () => {
    // Handle the action when the add news button is pressed
    // You can implement your logic here to add news.
  };

  return (
    <View>
      <SearchBar onSearch={handleSearch} onAddNews={handleAddNews} />
      {filteredItems.map(item => (
        <Post key={item.id}>
          <PostImage
            source={{
              uri: `${item.url}`,
            }}
          />
          <PostInfo>
            <PostTitle>{item.title}</PostTitle>
            <PostText>{item.text}</PostText>
            <PostTime>{item.created_at}</PostTime>
          </PostInfo>
        </Post>
      ))}

      <StatusBar />
    </View>
  );
}

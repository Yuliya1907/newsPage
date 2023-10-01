import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
//import axios from 'axios';

const CreateNewsScreen = () => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsText, setNewsText] = useState('');

  //   function getCurrentDateTime() {
  //     const now = new Date();
  //     return now.toISOString();
  //   }

  const isCreateButtonDisabled = () => {
    return newsTitle.trim() === '' || newsText.trim() === '';
  };
  //   const createNews = async newsData => {
  //     try {
  //       const response = await axios.post(
  //         'https://yourtestapi.com/api/posts/',
  //         newsData,
  //       );
  //       console.log('Дані новини успішно додані:', response.data);
  //       return response.data; // Можливо, повернути створену новину
  //     } catch (error) {
  //       console.error('Помилка при додаванні новини:', error);
  //       throw error;
  //     }
  //   };

  //   const newsData = {
  //     title: 'Заголовок новини',
  //     text: 'Текст новини',
  //     image: 'URL до зображення',
  //     url: 'URL новини',
  //     created_at: getCurrentDateTime(),
  //   };
  //   createNews(newsData)
  //     .then((createdNews) => {
  //       // Оновлюємо список новин або виконуємо інші дії
  //     })
  //     .catch((error) => {
  //       // Обробка помилок
  //     });

  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.goBack(); // Перехід на попередню сторінку
  };

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHome}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 2L8.59 3.41L13.17 8H3v4h10.17l-4.58 4.59L10 22l6-6L10 2z"
              fill="#000"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Title"
        onChangeText={text => setNewsTitle(text)}
        value={newsTitle}
      />
      <TextInput
        placeholder="Image url"
        onChangeText={text => setNewsTitle(text)}
        value={newsTitle}
      />
      <TextInput
        placeholder="Link"
        onChangeText={text => setNewsTitle(text)}
        value={newsTitle}
      />
      <TextInput
        placeholder="Type your message here.."
        onChangeText={text => setNewsText(text)}
        value={newsText}
        multiline={true}
      />
      <Button
        title="Public"
        onPress={() => {
          // Додайте тут логіку для створення новини
        }}
        disabled={isCreateButtonDisabled()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // Додайте інші стилі за потреби
  },
});

export default CreateNewsScreen;

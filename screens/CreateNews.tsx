import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

type CreateNewsScreenProps = {
  route: RouteProp<
    {
      params: {
        setShouldRefresh: (refresh: boolean) => void;
      };
    },
    'params'
  >;
};

const CreateNewsScreen: React.FC<CreateNewsScreenProps> = ({route}) => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsText, setNewsText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newsUrl, setNewsUrl] = useState('');

  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.goBack();
  };

  const isCreateButtonDisabled = () => {
    return (
      newsTitle.trim() === '' ||
      newsText.trim() === '' ||
      imageUrl.trim() === '' ||
      newsUrl.trim() === ''
    );
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const createNews = async () => {
    const newsData = {
      title: newsTitle,
      text: newsText,
      image: imageUrl,
      url: newsUrl,
      created_at: getCurrentDateTime(),
    };

    try {
      const response = await axios.post(
        'https://yourtestapi.com/api/posts/',
        newsData,
      );
      console.log('Дані новини успішно додані:', response.data);
      const setShouldRefresh = route.params?.setShouldRefresh;

      setShouldRefresh && setShouldRefresh(true);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Помилка при додаванні новини:', error);
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHome} />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        onChangeText={text => setNewsTitle(text)}
        value={newsTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Image url"
        onChangeText={text => setImageUrl(text)}
        value={imageUrl}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Link"
        onChangeText={text => setNewsUrl(text)}
        value={newsUrl}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Type your message here.."
        onChangeText={text => setNewsText(text)}
        value={newsText}
        multiline={true}
      />
      <View style={styles.btn}>
        <Button
          title="Public"
          onPress={createNews}
          disabled={isCreateButtonDisabled()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 60,
    width: 340,
    borderRadius: 10,
    backgroundColor: '#A4A9AE26',
    alignSelf: 'center',
    paddingLeft: 30,
    fontSize: 17,
    fontStyle: 'normal',
    marginBottom: 25,
  },
  btn: {
    width: 340,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#456EFE',
    opacity: 0.6,
  },
});

export default CreateNewsScreen;

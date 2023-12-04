import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground
} from 'react-native';
import '../assets/i18n/i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { white } from '../assets/styles/Style';
import {AuthContext} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("Mobile");
  const [password, setPassword] = useState("111111");
  const {isLoading, login, userInfo} = useContext(AuthContext);
  
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] = useState('vi');
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const { navigate} = useNavigation();
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
  
  useEffect(() => {
    if(userInfo) {
      navigate('Home');
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      {/* <Spinner visible={isLoading} /> */}
      <ImageBackground source={require('../assets/images/pictures/background-login.png')} 
        style={styles.backgroundImage}>
        <View style={styles.wrapper}>
          
          <SafeAreaView>
            <Image style={styles.logo} source={require('../assets/images/pictures/logo-x2.png')} />  
          </SafeAreaView>
                  
          <TextInput
            style={styles.input}
            value={username}
            placeholder={t('plh.input.username')}
            onChangeText={text => setUsername(text)}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder={t('plh.input.password')}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />

          <Button
            title={t('btn.login')}
            onPress={() => {
              login(username, password);
            }}
          />

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text>{t('lbl.login.has-account')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>{t('url.register')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.br}></View>
          <View style={styles.br}></View>
          <View style={styles.br}></View>
          <View style={styles.br}></View>
          <View style={styles.br}></View>

         {/*  <SafeAreaView>
            <Image style={styles.logo} source={require('../assets/images/pictures/logo-usaid.jpg')} />  
          </SafeAreaView> */}

          {/* <Pressable
            onPress={() => changeLanguage('en')}
            style={{
              fontWeight:
                currentLanguage === 'en' ? 'bold' : '',
            }}>
            <Text>{t('url.en')}</Text>
          </Pressable>
          <Pressable
            onPress={() => changeLanguage('vi')}
            style={{
              fontWeight:
                currentLanguage === 'vi' ? 'bold' : '',
            }}>
            <Text>{t('url.vi')}</Text>
          </Pressable>     */}

        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
  },
  wrapper: {
    flex: 1,   
    justifyContent: 'center',  
    alignSelf: 'center',  
    width: '80%'
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: white,
    borderRadius: 5,
    paddingHorizontal: 14,
    fontSize: 15
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  link: {
    color: 'blue',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20
  },
  selected: {
    fontWeight: 'bold'
  },
  br:{
    width: "100%",
    marginTop: 5,
    marginBottom: 5
  },
});

export default LoginScreen;

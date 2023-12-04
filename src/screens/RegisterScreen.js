import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { white } from '../assets/styles/Style';
import {AuthContext} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';
import '../assets/i18n/i18n';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {t, i18n} = useTranslation();
  const {isLoading, register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
      <SafeAreaView>
          <Image style={styles.logo} source={require('../assets/images/pictures/slogan.jpg')} />  
        </SafeAreaView>
        <TextInput
          style={styles.input}
          value={name}
          placeholder={t('plh.input.username')}
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder={t('plh.input.email')}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder={t('plh.input.password')}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title={t('btn.register')}
          onPress={() => {
            register(name, email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>{t('lbl.register.has-account')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>{t('url.login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    fontSize: 14
  },
  link: {
    color: 'blue',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20
  }
});

export default RegisterScreen;

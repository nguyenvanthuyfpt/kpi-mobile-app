import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
        SafeAreaView, TouchableHighlight,
        Button, Text, 
        TextInput,  TouchableOpacity,  
        View,  StyleSheet } from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import CheckBox from '@react-native-community/checkbox';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { white } from '../assets/styles/Style';

const DetailHomeVisitScreen = ({route, navigation}) => {

  const { isLoading, endAt, supportId, visitId, isDone, setIsDone, rehab, homeCare } = useContext(AuthContext);
  const { homeVisit } = useContext(AuthContext);
  const { getDetailDisInfo } = useContext(AuthContext);
  const { navigate} = useNavigation();

  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;

  const {t, i18n} = useTranslation();



  const btnBack = (id) => {
    getDetailDisInfo(id);
    navigation.navigate('Detail', { disId: id, curLatitude, curLongitude });
  }

  return (
    <View style={styles.wrapper}>
        <Spinner visible={isLoading} />
        
        <Text style={styles.infoHeader} >{t('hdr.homevisit-info')} {homeVisit.disId}</Text>        
        
       
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.home.time.start')}:</Text>
            <Text style={styles.contentItem}>{homeVisit.startAt}</Text>
        </View>
       
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.home.time.end')}:</Text>
            <Text style={styles.contentItem}>{homeVisit.endAt}</Text>
        </View>

        <View style={styles.row}>
            <Icon.Button name="home"
              backgroundColor="#3b5998">
              {t('lbl.location')}
            </Icon.Button>
            <Text style={styles.contentItem}>{homeVisit.latitude} {homeVisit.longitude}</Text>
        </View>
        <View style={styles.separator}></View>         
        
        <View style={styles.row}>
          <CheckBox
            value={rehab}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{t('lbl.support.rehab')}</Text>
          <CheckBox
            value={homeCare}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{t('lbl.support.homecare')}</Text>
        </View>

        <Text style={styles.separator}></Text>
      <View style={styles.br}></View>

      <View style={styles.br}></View>
      <Button
        title={t('btn.cancel')}
        onPress={() => {btnBack(disId)}}          
      />     
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
    padding: 10,
    width: '100%',
  }, 
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    fontSize: 15
  },
  btn_group: {
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  link: {
    color: 'blue',
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginTop: 5,
    marginBottom: 5
  },
  br:{
    width: "100%",
    backgroundColor: "#CED0CE",
    marginTop: 5,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row'
  }, 
  titleItem: {
    flex: 1,
    minHeight: 20,
    fontSize: 15
  },
  contentItem: {
    flex: 1,
    textAlign: 'right',
    width: "70%",
    fontWeight: 'bold',
    fontSize: 15
  },
  lineItem: {
    height: 1,
    backgroundColor: '#F5F5F5'
  },
  emptyListStyle: {
    textAlign: 'center',
    padding: 40,
  },
  infoHeader: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};

export default DetailHomeVisitScreen;

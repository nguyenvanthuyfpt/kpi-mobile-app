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

const HomeVisitScreen = ({route, navigation}) => {

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const { isLoading, endAt, supportId, visitId, isDone, setIsDone, addHomeVisit } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);  
  const [ locationStatus, setLocationStatus] = useState('');
  const { homeVisit } = useContext(AuthContext);
  const { getDetailDisInfo } = useContext(AuthContext);
  const { navigate} = useNavigation();

  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;
  const { fromDate } = route.params;

  const {t, i18n} = useTranslation();

  const [rehab, setRehab] = useState(false);
  const [homecare, setHomecare] = useState(false);

  const btnBack = (id) => {
    setIsDone(-1);
    getDetailDisInfo(id);
    navigation.navigate('Detail', { disId: id, curLatitude, curLongitude });
  }

  return (
    <View style={styles.wrapper}>
        <Spinner visible={isLoading} />

        <Text style={styles.infoHeader} >{t('hdr.homevisit-info')}</Text>        
        {
           isDone!=-1?
          <View style={styles.row}>
              <Text style={styles.titleItem}>{t('lbl.home.time.start')}:</Text>
              <Text style={styles.contentItem}>{homeVisit.startAt}</Text>
          </View>:null
        }

        {
           isDone==1?
          <View style={styles.row}>
              <Text style={styles.titleItem}>{t('lbl.home.time.end')}:</Text>
              <Text style={styles.contentItem}>{homeVisit.endAt}</Text>
          </View>:null
        }

        <View style={styles.row}>            
            <Icon.Button name="home"
              backgroundColor="#3b5998">
              {t('lbl.location')}
            </Icon.Button>
            <Text style={styles.contentItem}>{curLatitude} {curLongitude}</Text>
        </View>

        <View style={styles.separator}></View>         
        
        <View style={styles.row}>
          <CheckBox
            value={rehab}
            onValueChange={setRehab}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{t('lbl.support.rehab')}</Text>
          <CheckBox
            value={homecare}
            onValueChange={setHomecare}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{t('lbl.support.homecare')}</Text>
        </View>
        
        <View style={styles.separator}></View>
        
        {
           isDone==1?
          null:
          <View style={styles.timerSection}>
            <Stopwatch
                laps
                start={isStopwatchStart}  // To start
                reset={resetStopwatch}    // To reset
                options={options}        // Options for the styling
                getTime={(time) => {
                  // console.log(time);
                }}
            />          
          </View>
        }

      <Text style={styles.separator}></Text>  
        {isDone!=1?
        <Button
            title={isDone == -1 ? t('btn.start-home'):t('btn.end-home')}
            onPress={() => {
              addHomeVisit(isDone == -1?0:homeVisit.visitId, 0, disId, userInfo.id, 
                  curLatitude, curLongitude, rehab, homecare);
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}          
        />:null}
        
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
  timerSection :{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
});

// Styling Timer
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

export default HomeVisitScreen;

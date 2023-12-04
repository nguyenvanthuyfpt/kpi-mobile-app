import React, { useContext, useEffect, useState } from 'react';
import {Button, Text, TextInput,  TouchableOpacity,  View,  StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { white } from '../assets/styles/Style';

const DisInfoScreen = ({route, navigation}) => {
  const { isLoading, endAt, supportId, addHomeVisit } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { disInfo } = useContext(AuthContext);
  const { disSupport } = useContext(AuthContext);
  
  const { homeVisit } = useContext(AuthContext);
  const { getDetailDisInfo } = useContext(AuthContext);
  const { navigate} = useNavigation();

  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;
  const { fromDate } = route.params;

  const [mtieuGdinh, setMTieuGdinh] = useState("");
  const [mtieuDtri, setMtieuDtri] = useState("");
  const [ctVltl, setCtVltl] = useState("");
  const [ctHdtl, setCtHdtl] = useState("");
  const [ctAntl, setCtAntl] = useState("");
  const [ctGddb, setCtGddb] = useState("");
  const [ctCsgn, setCtCsgn] = useState("");
  const {t, i18n} = useTranslation();

  const [reson, setReson] = useState("");

  const btnBack = (id) => {   
    getDetailDisInfo(id);
    // Go to DetailScreen
    navigation.navigate('Detail', { disId: id, curLatitude, curLongitude });
  }

  return (
    <View style={styles.wrapper}>
        <Spinner visible={isLoading} />
        
        <Text style={styles.infoHeader} >{t('hdr.support-info')}</Text>        
        
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.createdate')}:</Text>
            <Text style={styles.contentItem}>{disSupport.createdDate}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.date.from')}: </Text>
            <Text style={styles.contentItem}>{disSupport.fromDate}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.date.to')}: </Text>
            <Text style={styles.contentItem}>{disSupport.toDate}</Text>
        </View>

        <View style={styles.separator}></View>         
        
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.mtdt')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{disSupport.mtieuGD}</Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.ctvltl')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{disSupport.ctVLTL}</Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.cthdtl')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{disSupport.ctHDTL}</Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.ctantl')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{disSupport.ctANTL}</Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.ctgddb')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{disSupport.ctGDDB}</Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.cstn')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}></Text>            
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.sp.htro')}: </Text>            
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}></Text>            
        </View>
        
        {/* <TextInput
          style={styles.input}
          value={disSupport.mtieuDT}
          placeholder={t('plh.input.info')}
          onChangeText={text => setMtieuDtri(text)}
        />
       
        <TextInput
          style={styles.input}
          value={disSupport.ctVLTL}
          placeholder={t('plh.input.info')}
          onChangeText={text => setCtVltl(text)}
        />
      
        <TextInput
          style={styles.input}
          value={disSupport.ctHDTL}
          placeholder={t('plh.input.info')}
          onChangeText={text => setCtHdtl(text)}
        />
    
        <TextInput
          style={styles.input}
          value={disSupport.ctANTL}
          placeholder={t('plh.input.info')}
          onChangeText={text => setCtAntl(text)}
        />
      
      
        <TextInput
            style={styles.input}
            value={disSupport.ctGDDB}
            placeholder={t('plh.input.info')}
            onChangeText={text => setCtGddb(text)}
          />

        <TextInput
          style={styles.input}
          value={disSupport.ctCSGN}
          placeholder={t('plh.input.info')}
          onChangeText={text => setCtCsgn(text)}
        /> */}
      
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
});

export default DisInfoScreen;

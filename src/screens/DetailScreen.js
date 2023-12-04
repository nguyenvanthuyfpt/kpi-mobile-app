import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { TabView, SceneMap } from 'react-native-tab-view';
import { white } from '../assets/styles/Style';
import {useTranslation} from 'react-i18next';

const DetailScreen = ({route, navigation}) => {
  const { isLoading, endAt, supportId, addHomeVisit } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { disInfo } = useContext(AuthContext);
  const { disSupport } = useContext(AuthContext);
  const { homeVisit } = useContext(AuthContext);
  const { getDetailDisInfo } = useContext(AuthContext);
  const { navigate} = useNavigation();

  const { getDetailSupport } = useContext(AuthContext);
  const { getDetailHomeVisit } = useContext(AuthContext);
  
  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;
  const { cmd } = "add";

  const [mtieuGdinh, setMTieuGdinh] = useState("");
  const [mtieuDtri, setMtieuDtri] = useState("");
  const [ctVltl, setCtVltl] = useState("");
  const [ctHdtl, setCtHdtl] = useState("");
  const [ctAntl, setCtAntl] = useState("");
  const [ctGddb, setCtGddb] = useState("");
  const [reson, setReson] = useState("");

  const btnBack = (id) => {   
    getDetailDisInfo(id);    
    navigation.navigate('Home', { disId: id, curLatitude, curLongitude });
  }

  // TAB1:DIS INFORMATION
  const FirstRoute = () => (
    <View style={styles.wrapper}>        
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.last-update-date')}:</Text>
            <Text style={styles.contentItem}>{disInfo.strDateLastUpdate}</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.code')}:</Text>
            <Text style={styles.contentItem}>{disInfo.maSo}</Text>
        </View>     

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.name')}:</Text>
            <Text style={styles.contentItem}>{disInfo.fullName}</Text>
        </View>    

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.pwdcode')}:</Text>
            <Text style={styles.contentItem}>{disInfo.pwdCode}</Text>
        </View>

        <View style={styles.row}> 
            <Text style={styles.titleItem}>{t('lbl.birthyear')}:</Text>
            <Text style={styles.contentItem}>{disInfo.strBirthDay}</Text>
        </View>

        <View style={styles.row}> 
            <Text style={styles.titleItem}>{t('lbl.phone')}:</Text>
            <Text style={styles.contentItem}>{disInfo.phone}</Text>
        </View>

        <View style={styles.row}> 
            <Text style={styles.titleItem}>{t('lbl.dantoc')}:</Text>
            <Text style={styles.contentItem}>{disInfo.danTocId==3?t('lbl.dantoc.3'):t('lbl.NA')}</Text>
        </View>

        <View style={styles.row}>    
            <Text style={styles.titleItem}>{t('lbl.sex')}:</Text>
            <Text style={styles.contentItem}>{disInfo.sex==1?t('lbl.sex.1'):t('lbl.sex.0')}</Text>        
        </View>
        
        <View style={styles.row}>    
            <Text style={styles.titleItem}>{t('lbl.dioxin')}:</Text>
            <Text style={styles.contentItem}>{disInfo.sex==1?t('lbl.yes'):t('lbl.no')}</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.status')}:</Text>
            <Text style={styles.contentItem}>{disInfo.trangThai==1?t('lbl.status.1'):t('lbl.status.0')}</Text>        
        </View>
        
        <View style={styles.row}>            
            <Text style={styles.titleItem} bold>{t('lbl.address')}: {disInfo.address}</Text>        
        </View>        

        <View style={styles.separator}></View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.pro')}:</Text>
            <Text style={styles.contentItem}>{disInfo.proName}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.dist')}:</Text>
            <Text style={styles.contentItem}>{disInfo.districtName}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.com')}:</Text>
            <Text style={styles.contentItem}>{disInfo.communeName}</Text>
        </View>
       
        <View style={styles.separator}></View>        
        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.ncs.name')}:</Text>
            <Text style={styles.contentItem}>{disInfo.ncsTen}</Text>               
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.ncs.birth')}:</Text>
            <Text style={styles.contentItem}>{disInfo.ncsNamSinh}</Text>        
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.ncs.phone')}:</Text>
            <Text style={styles.contentItem}>{disInfo.ncsSdt}</Text>        
        </View>

        <View style={styles.row}>
            <Text style={styles.titleItem}>{t('lbl.project')}:</Text>
            <Text style={styles.contentItem}>{disInfo.duAn==1?t('lbl.project.1'):t('lbl.project.0')}</Text>        
        </View>

        <View style={styles.br}></View>

        <Button
          title={t('btn.exit')}
          onPress={() => {btnBack(disId)}}          
        />
    </View>
  );

  const rowPressSupport = (id, fromDate) => {   
      getDetailSupport(id, fromDate, 1);
      navigation.navigate('DisInfo', { disId: id, curLatitude, curLongitude });
  }

  const rowPressHomeVisit = (visitId) => {
      getDetailHomeVisit(visitId);
      navigation.navigate('DetailHomeVisit', 
      { disId: disId, curLatitude, curLongitude, visitId: visitId});
  }

  // TABS2: List Support of DIS
  const renderItemSupport = (itemData) => {
    return (
      <TouchableWithoutFeedback onPress={() => rowPressSupport(itemData.item.disId, itemData.item.fromDate)}>        
          <View style={styles.innerContainer}>          
            <Text style={styles.title}>{t('lbl.sp.createdate')}: { itemData.item.strDateCreate}</Text>
            <Text style={styles.title}>{t('lbl.sp.date.from')}: {itemData.item.strDateFrom} - {t('lbl.sp.to')}: {itemData.item.strDateTo}</Text>            
            <Text style={styles.title}>{t('lbl.sp.nguon')}: {itemData.item.nguonHoTroId}</Text>
            
            
            {/* <Text>{t('lbl.sp.ctvltl')} :{itemData.item.ctVLTL}</Text>
            <Text>{t('lbl.sp.cthdtl')} :{itemData.item.ctHDTL}</Text>
            <Text>{t('lbl.sp.ctantl')} :{itemData.item.mdoPTDL}</Text> */}

            {/* <Text style={styles.title}>{t('lbl.sp.ctvltl')} : {itemData.item.ctVLTL}</Text>
            <Text style={styles.title}>{t('lbl.sp.cthdtl')} : {itemData.item.ctHDTL}</Text>
            <Text style={styles.title}>{t('lbl.sp.ctantl')} : {itemData.item.ctANTL}</Text>
            <Text style={styles.title}>{t('lbl.sp.htro')} : {itemData.item.reson}</Text> */}
          </View>       
      </TouchableWithoutFeedback  >
    );
  }
  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}>
        {t('label.no.data')}
      </Text>
    );
  };

  // TABS3: List HomeVisit of DIS
  const renderItemHome = (itemData) => {
    return (
      <TouchableWithoutFeedback onPress={() => rowPressHomeVisit(itemData.item.id)}>        
          <View style={styles.innerContainer}>          
            <Text style={styles.title}>{t('lbl.home.time.start')}: { itemData.item.strStartAt}</Text>
            <Text style={styles.title}>{t('lbl.home.time.end')}: { itemData.item.strEndAt}</Text>
          </View>       
      </TouchableWithoutFeedback  >
    );
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginTop: 3,
          marginBottom: 3
        }}
      />
    );
  };
  
  // Tab SUPPORT
  const SecondRoute = () => (
    <View style={styles.wrapper}>
      <FlatList
          data={disSupport}
          renderItem={renderItemSupport}
          ListEmptyComponent={EmptyListMessage}
          ItemSeparatorComponent={renderSeparator}
        />
    </View>
  );

  // Tab HOME
  const ThirdRoute = () => (
    <View style={styles.wrapper}>
      <FlatList
          data={homeVisit}
          keyExtractor={(item) => item.id}
          renderItem={renderItemHome}
          ListEmptyComponent={EmptyListMessage}
          ItemSeparatorComponent={renderSeparator}
        />
        
        <View style={styles.br}></View>
        
        <Button
            title={t('btn.add-home')}
            onPress={() => navigation.navigate('HomeVisit', 
              { disId: disId, curLatitude, curLongitude, visitId: 0})}          
          />
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();
  const {t, i18n} = useTranslation();
  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
    { key: 'first', title: t('tab.general') },
    { key: 'second', title: t('tab.support') },
    { key: 'third', title: t('tab.home-visit') },
  ]);
  
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />    
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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginTop: 5,
    marginBottom: 5
  },
  list_data : {
    padding: 10,
    width: "100%",
    fontSize: 15
  },
  title: {
    fontSize: 15,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 15,
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
  row: {
    flexDirection: 'row'
  },
  br:{
    width: "100%",
    backgroundColor: "#CED0CE",
    marginTop: 5,
    marginBottom: 5
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
});

export default DetailScreen;

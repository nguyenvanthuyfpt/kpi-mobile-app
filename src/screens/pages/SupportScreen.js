import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';

const SupportScreen = ({route}) => {
  const { isLoading, endAt, supportId, addHomeVisit } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { disInfo } = useContext(AuthContext);
  const { homeVisit } = useContext(AuthContext);
  
  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;

  const [mtieuGdinh, setMTieuGdinh] = useState("");
  const [mtieuDtri, setMtieuDtri] = useState("");
  const [ctVltl, setCtVltl] = useState("");
  const [ctHdtl, setCtHdtl] = useState("");
  const [ctAntl, setCtAntl] = useState("");
  const [ctGddb, setCtGddb] = useState("");

  const [reson, setReson] = useState("");
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>        
        <Text>Support: </Text>
        <Text style={styles.separator}></Text>

        {endAt=="null"?null:
        <Button
          title={supportId==0?'Add Home Visit':'Update Home Visit'}
          onPress={() => {
            addHomeVisit(homeVisit.visitId, supportId, disId, 
              userInfo.id, curLatitude, curLongitude, mtieuGdinh, mtieuDtri, reson);
          }}          
        />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default SupportScreen;

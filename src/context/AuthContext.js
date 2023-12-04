import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { BASE_URL } from '../config';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [disInfo, setDisInfo] = useState([]);
  const [disSupport, setDisSupport] = useState([]);
  const [homeVisit, setHomeVisit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const [supportId, setSupportId] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const [isDone, setIsDone] = useState(-1);
  const [rehab, setRehab] = useState(false);
  const [homeCare, setHomecare] = useState(false);
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNb2JpbGUiLCJpc3MiOiJLUEktQVBQIiwiaWF0IjoxNjk1ODE2NjMyLCJleHAiOjE2OTU4MjI2MzJ9.Yl3BTq25NO7WXCX4hHRlzPrHvjk-mwwCbb4qr8Nu5l-1GvrOObuCQb3zlHQWkVZnQaJrNbNGejU63vRlK4ruqw';

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      })
      .then(res => {
        let retval = res.data;
        if (retval.code == "00000") {
          setUserInfo(retval);
          AsyncStorage.setItem('userInfo', JSON.stringify(retval));
        } else {
          Alert.alert(retval.message);
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/signin`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;        
        console.log(userInfo);
        if (userInfo.code == "99999") {
          Alert.alert(userInfo.message);
        } else {
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));  
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.error(`signin login error ${e}`);
        Alert.alert(e);
        setIsLoading(false);
      });
  };
  
  const getDisInfo = (pwdCode, pwdName) => {    
    setIsLoading(true);
    setIsViewDetail(false);
    axios
      .get(
        `${BASE_URL}/dis-info?tinhId=2747&maSo=` + pwdCode+'&fullName='+pwdName,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        let dis = res.data;
        setDisInfo(dis.data);
        AsyncStorage.setItem('disInfo', JSON.stringify(dis));
        setIsLoading(false);
      })
      .catch(e => {
        // console.log(`SearchBtn:accessToken  ${userInfo.accessToken}`);
        // console.log(`SearchBtn:getDisInfo error ${e}`);
        setIsLoading(false);
      });
  };

  const getDetailDisInfo = (disId) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/get-dis-info?disId=` + disId,
        {},
        {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNb2JpbGUiLCJpc3MiOiJLUEktQVBQIiwiaWF0IjoxNjk1ODE2NjMyLCJleHAiOjE2OTU4MjI2MzJ9.Yl3BTq25NO7WXCX4hHRlzPrHvjk-mwwCbb4qr8Nu5l-1GvrOObuCQb3zlHQWkVZnQaJrNbNGejU63vRlK4ruqw` },
        },
      )
      .then(res => {
        let data = res.data;
        let totalItems = res.totalItems;    
        setDisInfo(data.disInfo); 
        setDisSupport(data.supportInfo);
        setHomeVisit(data.homeInfo);
        AsyncStorage.setItem('disInfo', JSON.stringify(data.disInfo));    
        AsyncStorage.setItem('disSupport', JSON.stringify(data.supportInfo));
        AsyncStorage.setItem('disHome', JSON.stringify(data.homeInfo)); 
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`getDetailDisInfo error ${e}`);
        setIsLoading(false);
      });
  };

  const getDetailHomeVisit = (id) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/get-home-visit?visitId=` + id,
        {},
        {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNb2JpbGUiLCJpc3MiOiJLUEktQVBQIiwiaWF0IjoxNjk1ODE2NjMyLCJleHAiOjE2OTU4MjI2MzJ9.Yl3BTq25NO7WXCX4hHRlzPrHvjk-mwwCbb4qr8Nu5l-1GvrOObuCQb3zlHQWkVZnQaJrNbNGejU63vRlK4ruqw` },
        },
      )
      .then(res => {
        let data = res.data;
        console.log(data);
        setHomeVisit(data);
        AsyncStorage.setItem('homeVisit', JSON.stringify(data));        
        setRehab(data.rehab==1?true:false);
        setHomecare(data.homeCare==1?true:false);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`getDetailHomeVisit error ${e}`);
        setIsLoading(false);
      });
  };

  const getDetailSupport = (disId, fromDate, status) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/dis-support?disId=` + disId + "&createdDate=" + fromDate + "&status="+status,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        let data = res.data;
        // console.log(data);
        setDisSupport(data);               
        AsyncStorage.setItem('disSupport', JSON.stringify(data));    
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`getDetailSupport error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo(null);
        setDisInfo([]);
        setDisSupport(null);
        setHomeVisit([]);
        setSupportId(0);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      console.log("isLoggedIn " + userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const addHomeVisit = (visitId, supportId, disId, userId, latitude, longitude, rehab, homecare) => {
    setIsLoading(true);
    console.log("rehab " + rehab + " homecare " + homecare);
    axios
      .post(`${BASE_URL}/add-home-visit`, {
        visitId, supportId, disId, userId, latitude, longitude, rehab, homecare
      },
      {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      },)
      .then(res => {
        let retval = res.data;
        AsyncStorage.setItem('homeVisit', JSON.stringify(retval));
        setHomeVisit(retval);
        console.log('HomeVisit '+retval.visitId)
        setSupportId(retval.supportId);
        setEndAt(retval.visitId==0?retval.endAt:"-1");
        setIsDone(retval.endAt=='N/A'? 0:1);   // Add OR Update
        setIsLoading(false);
      })
      .catch(e => {        
        console.log(`addHomeVisit error ${e}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isLoggedIn();
    getDisInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        disInfo,
        disSupport,
        homeVisit,
        splashLoading,
        isViewDetail,
        supportId,
        isDone,
        rehab,
        homeCare,
        register,
        login,
        logout,
        setIsDone,
        setRehab,
        setHomecare,
        getDisInfo,
        getDetailDisInfo,
        getDetailSupport,
        getDetailHomeVisit,
        addHomeVisit
      }}>
      {children}
    </AuthContext.Provider>
  );
};

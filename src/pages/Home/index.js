/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {bandara} from '../../database';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [lokasikeberangkatan, setLokasikeberangkatan] = useState(
    'Lokasi Keberangkatan',
  );
  const [kodekeberangkatan, setKodekeberangkatan] = useState('');
  const [lokasitujuan, setLokasitujuan] = useState('Lokasi Tujuan');
  const [kodetujuan, setKodetujuan] = useState('');
  const [tanggalkeberangkatan, setTanggalkeberangkatan] = useState(
    'Tanggal Keberangkatan',
  );
  const [databandara, setDatabandara] = useState(bandara);
  const [modalVisible, setModalVisible] = useState(false);
  const [choose, setChoose] = useState('');
  const [date, setDate] = useState(new Date());
  const [initialDate, setInitialdate] = useState(
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
  );
  const [datecode, setDatecode] = useState('');
  const navigation = useNavigation();

  // const jadwallist = databandara.map(datas => {
  //   return <Picker.item label={datas.bandara_nama} value={datas.bandara_nam} />;
  // });
  const openmodal = data => {
    setChoose(data);
    setModalVisible(true);
  };
  const onchange = (kode, name) => {
    if (choose == 'keberangkatan') {
      setLokasikeberangkatan(name);
      setKodekeberangkatan(kode);
      setChoose('');
      setModalVisible(!modalVisible);
    } else {
      setLokasitujuan(name);
      setKodetujuan(kode);
      setChoose('');
      setModalVisible(!modalVisible);
    }
  };

  const ubahtanggal = tanggal => {
    setDatecode(tanggal.day + ' ' + tanggal.month + ' ' + tanggal.year);
    if (tanggal.month === 0) {
      tanggal.month = 'Januari';
    } else if (tanggal.month === 1) {
      tanggal.month = 'Febuari';
    } else if (tanggal.month === 2) {
      tanggal.month = 'Maret';
    } else if (tanggal.month === 3) {
      tanggal.month = 'April';
    } else if (tanggal.month === 4) {
      tanggal.month = 'Mei';
    } else if (tanggal.month === 5) {
      tanggal.month = 'Juni';
    } else if (tanggal.month === 6) {
      tanggal.month = 'Juli';
    } else if (tanggal.month === 7) {
      tanggal.month = 'Agustus';
    } else if (tanggal.month === 8) {
      tanggal.month = 'September';
    } else if (tanggal.month === 9) {
      tanggal.month = 'Oktober';
    } else if (tanggal.month === 10) {
      tanggal.month = 'November';
    } else if (tanggal.month === 11) {
      tanggal.month = 'Desember';
    }
    setTanggalkeberangkatan(
      tanggal.day + ' ' + tanggal.month + ' ' + tanggal.year,
    );

    setModalVisible(!modalVisible);
  };
  const caridata = () => {
    if (kodekeberangkatan != '' && kodetujuan != '' && datecode != '') {
      navigation.navigate('Detail', {kodekeberangkatan, kodetujuan, datecode});
    } else {
      Alert.alert('Oops', 'Pilih Dulu Ya');
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.setbackground} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {choose != '' && (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={databandara}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.list}
                    onPress={() =>
                      onchange(item.bandara_kode, item.bandara_nama)
                    }>
                    <Text style={styles.textlist}>{item.bandara_nama}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.bandara_kode}
              />
              <TouchableOpacity
                style={styles.buttonmodal}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setChoose('');
                }}>
                <Text style={styles.textcancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {choose == '' && (
          <SafeAreaView>
            <Calendar
              initialDate={initialDate}
              onDayPress={day => {
                ubahtanggal(day);
              }}
              onDayLongPress={day => {
                ubahtanggal(day);
              }}
            />
          </SafeAreaView>
        )}
      </Modal>
      <SafeAreaView style={styles.header}>
        <MaterialCommunityIcons name="menu" color={'white'} size={30} />
        <MaterialCommunityIcons name="account" color={'white'} size={30} />
      </SafeAreaView>
      <SafeAreaView style={styles.body}>
        <Text style={styles.textheader}>Hilling.id</Text>
        <SafeAreaView style={styles.box}>
          <SafeAreaView style={styles.kotak}>
            <Text style={styles.title}>Lokasi Keberangkatan</Text>
            <SafeAreaView style={styles.input}>
              <MaterialCommunityIcons
                name="airplane-takeoff"
                color={'#55ab46'}
                size={30}
                style={styles.icon}
              />
              <Pressable
                onPress={() => openmodal('keberangkatan')}
                style={{width: '100%'}}>
                <Text style={styles.textoption}>{lokasikeberangkatan}</Text>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.kotak}>
            <Text style={styles.title}>Lokasi Tujuan</Text>
            <SafeAreaView style={styles.input}>
              <MaterialCommunityIcons
                name="airplane-landing"
                color={'#55ab46'}
                size={30}
                style={styles.icon}
              />
              <Pressable
                onPress={() => openmodal('Tujuan')}
                style={{width: '100%'}}>
                <Text style={styles.textoption}>{lokasitujuan}</Text>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.kotak}>
            <Text style={styles.title}>Jadwal Keberangkatan</Text>
            <SafeAreaView style={styles.input}>
              <MaterialCommunityIcons
                name="calendar-month"
                color={'#55ab46'}
                size={30}
                style={styles.icon}
              />
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textoption}>{tanggalkeberangkatan}</Text>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
          <Pressable
            style={styles.button}
            onPress={() => caridata()}>
            <Text style={styles.textbutton}>Cari</Text>
          </Pressable>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.textfooter}>Copyright Arya Daulat - 118140128</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  setbackground: {
    height: '60%',
    backgroundColor: '#55ab46',
    width: '100%',
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  list: {
    backgroundColor: '#55ab46',
    marginBottom: 10,
    padding: 10,
  },
  textlist: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  body: {
    flex: 0.7,
  },
  textheader: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 26,
    marginBottom: 30,
  },
  box: {
    marginHorizontal: 30,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d98900',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonmodal: {
    backgroundColor: '#55ab46',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textcancel: {
    color: 'white',
    fontSize: 14,
  },
  textbutton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  kotak: {
    marginVertical: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 6,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  textfooter: {
    color: 'black',
    alignSelf: 'center',
    marginBottom: 30,
  },
	textoption:{
		color:'black',
	},
});

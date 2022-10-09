/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {jadwal, bandara, maskapai, dataaslijadwal} from '../../database';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const Detail = () => {
  const [text, onChangeText] = useState('Tanggal Keberangkatan');
  const route = useRoute();
  const [dataaslijadwaltampil, setDataaslijadwaltampil] =
    useState(dataaslijadwal);
  const [datajadwal, setDatajadwal] = useState(jadwal);
  const [datamaskapai, setDatamaskapai] = useState(maskapai);
  const [databandara, setDatabandara] = useState(bandara);
  const navigation = useNavigation();

  useEffect(() => {
    ubahdata();
  }, []);
  // useLayoutEffect(() => {
  //   setDatajadwal(dataaslijadwaltampil);
  // });

  const ubahdata = () => {
    let ambildata = dataaslijadwaltampil;
    let filterarray = ambildata.filter(data => {
      return (
        data.bandara_kode_keberangkatan === route?.params?.kodekeberangkatan &&
        data.bandara_kode_tujuan === route?.params?.kodetujuan &&
        data.jadwal_id === route?.params?.datecode
      );
    });
    filterarray.forEach(function (part, index) {
      let ubahkeberangkatan = databandara.find(data => {
        return (
          data.bandara_kode === filterarray[index].bandara_kode_keberangkatan
        );
      });
      filterarray[index].bandara_kode_keberangkatan =
        ubahkeberangkatan.bandara_nama;
      let ubahtujuan = databandara.find(data => {
        return data.bandara_kode === filterarray[index].bandara_kode_tujuan;
      });
      filterarray[index].bandara_kode_tujuan = ubahtujuan.bandara_nama;
      let ubahmaskapai = datamaskapai.find(data => {
        return data.maskapai_id === filterarray[index].maskapai_id;
      });
      filterarray[index].maskapai_id = ubahmaskapai.maskapai_nama;
      let ubahtexttanggal = filterarray[index].jadwal_id.split(' ');
      if (ubahtexttanggal[1] === '0') {
        ubahtexttanggal[1] = 'Januari';
      } else if (ubahtexttanggal[1] === '1') {
        ubahtexttanggal[1] = 'Febuari';
      } else if (ubahtexttanggal[1] === '2') {
        ubahtexttanggal[1] = 'Maret';
      } else if (ubahtexttanggal[1] === '3') {
        ubahtexttanggal[1] = 'April';
      } else if (ubahtexttanggal[1] === '4') {
        ubahtexttanggal[1] = 'Mei';
      } else if (ubahtexttanggal[1] === '5') {
        ubahtexttanggal[1] = 'Juni';
      } else if (ubahtexttanggal[1] === '6') {
        ubahtexttanggal[1] = 'Juli';
      } else if (ubahtexttanggal[1] === '7') {
        ubahtexttanggal[1] = 'Agustus';
      } else if (ubahtexttanggal[1] === '8') {
        ubahtexttanggal[1] = 'September';
      } else if (ubahtexttanggal[1] === '9') {
        ubahtexttanggal[1] = 'Oktober';
      } else if (ubahtexttanggal[1] === '10') {
        ubahtexttanggal[1] = 'November';
      } else if (ubahtexttanggal[1] === '11') {
        ubahtexttanggal[1] = 'Desember';
      }
      filterarray[index].jadwal_id =
        ubahtexttanggal[0] +
        ' ' +
        ubahtexttanggal[1] +
        ' ' +
        ubahtexttanggal[2];
      onChangeText(
        ubahtexttanggal[0] +
          ' ' +
          ubahtexttanggal[1] +
          ' ' +
          ubahtexttanggal[2],
      );
    });

    setDatajadwal(filterarray);
  };
  const back = () => {
    console.log(dataaslijadwaltampil);
    console.log(datajadwal);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.page}>
      <SafeAreaView style={styles.header}>
        <SafeAreaView style={styles.headheader}>
          <Pressable onPress={() => back()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              color={'white'}
              size={30}
            />
          </Pressable>
          <Text style={styles.textheader}>Hilling.id</Text>
          <MaterialCommunityIcons name="account" color={'white'} size={30} />
        </SafeAreaView>
        <Text style={styles.texthead}>Hasil Pencarian Penerbangan</Text>
        <Text style={styles.texthead}>{text}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.body}>
        <FlatList
          data={datajadwal}
          renderItem={({item}) => (
            <SafeAreaView style={styles.boxlist}>
              <SafeAreaView style={styles.listtop}>
                <SafeAreaView style={styles.keberangkatan}>
                  <Text style={styles.text1}>
                    {item.bandara_kode_keberangkatan}
                  </Text>
                </SafeAreaView>
                <SafeAreaView style={styles.strip}>
                  <Text style={styles.text1}>-</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.tujuan}>
                  <Text style={styles.text1}>{item.bandara_kode_tujuan}</Text>
                </SafeAreaView>
              </SafeAreaView>
              <SafeAreaView style={styles.listbottom}>
                <SafeAreaView style={styles.maskapai}>
                  <MaterialIcons
                    name="airplanemode-on"
                    color={'#55ab46'}
                    size={30}
                    style={styles.icon}
                  />
                  <Text style={styles.text2}>{item.maskapai_id}</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.jadwal}>
                  <Text style={styles.text3}>{item.jadwal_id}</Text>
                </SafeAreaView>
              </SafeAreaView>
            </SafeAreaView>
          )}
          keyExtractor={(item, index) => item.jadwal_id + index}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.textfooter}>Copyright Arya Daulat - 118140128</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    backgroundColor: '#55ab46',
  },
  headheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  textheader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  texthead: {
    color: 'white',
    alignSelf: 'center',
  },
  body: {
    flex: 0.7,
  },
  boxlist: {
    // alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  listtop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  keberangkatan: {
    width: 120,
    marginLeft: 30,
  },
  strip: {
    marginHorizontal: 20,
  },
  tujuan: {
    width: 120,
  },
  listbottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text1: {
    color: 'black',
    fontSize: 16,
  },
  text2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text3: {
    color: 'darkblue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  maskapai: {
    width: 164,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  jadwal: {
    width: 140,
    justifyContent: 'center',
  },
  footer: {
    flex: 0.1,
    justifyContent: 'flex-end',
  },
  textfooter: {
    color: 'black',
    alignSelf: 'center',
    marginBottom: 30,
  },
});

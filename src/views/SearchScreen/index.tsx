import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppInput from '../../components/AppInput';
import {useAppNavigation, useAppRoute} from '../../navigation/hooks';
import {ROUTES} from '../../navigation/types';
import {useLocationActions} from '../../store/useLocationStore';
import BackButton from '../../components/BackButton';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Address[]>([]);
  const navigation = useAppNavigation<ROUTES.SEARCH_SCREEN>();
  const {type} = useAppRoute<ROUTES.SEARCH_SCREEN>().params;
  const {setLocationPointAction} = useLocationActions();

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${query}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
        .then(res => res.json())
        .then(json => {
          setResults(json.results ?? []);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item: any) => {
    setLocationPointAction({type, location: item});
    navigation.goBack();
  };

  console.log('results', results);
  return (
    <SafeAreaView style={styles.flex_container} >
      <BackButton
        onBackPress={() => navigation.goBack()}
      />
      <AppInput
        // label="Search Location..."
        placeholder='Search Location...'
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.search_row}
            onPress={() => handleSelect(item)}
          >
            <Text>{item?.SEARCHVAL}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


export default SearchScreen;

const styles = StyleSheet.create({
  flex_container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  search_row: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

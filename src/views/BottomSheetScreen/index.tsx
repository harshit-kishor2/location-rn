import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BottomSheet from './BottomSheet';
import {SafeAreaView} from 'react-native-safe-area-context';

interface CardProps {
  id: number;
  title: string;
  description: string;
}
const dummyVertical: CardProps[] = Array.from({length: 9}, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description: 'This is a detailed description. '.repeat(Math.floor(Math.random() * 10)),
}));


const MainScreen = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CardProps | null>(null);

  const openSheet = (item: CardProps) => {
    setSelectedItem(item);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.flex_container}>
      {/* Horizontal List */}
      <FlatList
        data={dummyVertical}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.padding_space}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.horizontalCard}>
            <Text>{item.title}</Text>
          </View>
        )}
      />

      {/* Vertical List */}
      <FlatList
        data={dummyVertical}
        contentContainerStyle={styles.padding_space}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.verticalCard}
            onPress={() => openSheet(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {/* BottomSheet */}
      <BottomSheet visible={sheetVisible} onClose={closeSheet}>
        <ScrollView>
          <Text style={styles.sheetTitle}>{selectedItem?.title}</Text>
          <Text style={styles.sheetContent}>{selectedItem?.description}</Text>

          <FlatList
            data={dummyVertical}
            horizontal
            contentContainerStyle={{marginTop: 16}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.horizontalCard}>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  flex_container: {
    flex: 1,
  },
  padding_space: {
    padding: 16,
  },
  verticalCard: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  horizontalCard: {
    width: 120,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sheetContent: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },
});

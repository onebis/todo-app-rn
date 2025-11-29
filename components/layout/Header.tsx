import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = false,
  rightComponent,
}: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            {/*<Icon name="arrow-back" size={24} color="#007AFF" />*/}
          </Pressable>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  leftContainer: {
    width: 40,
    justifyContent: 'center',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});

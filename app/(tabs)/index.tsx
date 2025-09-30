import { HelloWave } from '@/components/hello-wave';
import WeatherDisplay from '@/components/weather-display';
import { useWeather } from '@/hooks/use-Weather';
import React, { useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [city, setCity] = useState('');
  const [unitType, setUnitType] = useState<'metric' | 'imperial'>('metric');
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const { weatherData, loading, error } = useWeather(city);

  const handlePress = (type: 'metric' | 'imperial') => () => {
    setUnitType(type);
    Alert.alert(`Unit changed to ${type === 'metric' ? 'Celsius' : 'Fahrenheit'}`);
  }
  const handleInputChange = (text: string) => {
 
    setInputCity(text);
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());


    }
  }; 

  return (
    <SafeAreaProvider>
    
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <HelloWave />
          <Text style={styles.title}>Weather Forecast</Text>
          <Text style={styles.subtitle}>Enter a city to get the weather forecast</Text>
          <View style={{ flexDirection: 'row',  width: '25%' }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#005bb5' : '#007aff' },
          ]}
          onPress={handlePress('metric')}
        >
          <Text style={styles.buttonText}>°C</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#005bb5' : '#007aff' },
          ]}
          onPress={handlePress('imperial')}
        >
          <Text style={styles.buttonText}>°F</Text>
        </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g., New York"
            placeholderTextColor="#999"
            value={inputCity}
            onChangeText={handleInputChange}
          />  
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? '#005bb5' : '#007aff' },
            ]}
            onPress={handleSearch}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </View>
        <WeatherDisplay city={city} unitType={unitType} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#96ccf1ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default App;
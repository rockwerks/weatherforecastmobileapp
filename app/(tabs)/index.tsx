import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useWeather } from '@/hooks/use-Weather';
import React, { useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const getWeatherIcon = (weatherMain: string, weatherId: number) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return 'sun.max.fill';
    case 'clouds':
      if (weatherId === 801) return 'cloud.sun.fill'; // few clouds
      if (weatherId === 802) return 'cloud.sun.fill'; // scattered clouds
      return 'cloud.fill'; // broken/overcast clouds
    case 'rain':
      if (weatherId >= 500 && weatherId <= 504) return 'cloud.rain.fill';
      if (weatherId === 511) return 'cloud.sleet.fill'; // freezing rain
      return 'cloud.heavyrain.fill';
    case 'drizzle':
      return 'cloud.drizzle.fill';
    case 'thunderstorm':
      return 'cloud.bolt.rain.fill';
    case 'snow':
    default:
      return 'questionmark.circle.fill';
  }
};

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#233e3eff' }}
      headerImage={
        <IconSymbol
          size={225}
          color="#d4ca06ff"
          name="sun.max.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Weather by Rockwerks
        </ThemedText>
      </ThemedView>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <HelloWave />
          <Text style={styles.title}>Weather Forecast</Text>
          <Text style={styles.subtitle}>Enter a city to get the weather forecast</Text>
          <View style={{ flexDirection: 'row', width: '25%' }}>
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
                        <View style={styles.weatherMainContainer}>
                <IconSymbol
                  size={100}
                  color="#4d4f4fff"
                  name={weatherData ? getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].id) : 'questionmark.circle.fill'}
                  style={styles.weatherIcon}
                />
          <Text style={styles.title}>{weatherData?.name}, {weatherData?.sys?.country}</Text>
          <Text style={styles.subtitle}>{weatherData ? new Date(weatherData.dt * 1000).toLocaleDateString() : ''}   {weatherData ? new Date(weatherData.dt * 1000).toLocaleTimeString() : ''}</Text>
          <Text style={styles.text}>{weatherData ? weatherData.weather[0].main : ''}</Text>
          <Text style={styles.text}>{weatherData ? weatherData.weather[0].description : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Temperature: ${weatherData.main.temp}°${unitType === 'metric' ? 'C' : 'F'}` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Humidity: ${weatherData.main.humidity}%` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Wind Speed: ${weatherData.wind.speed} ${unitType === 'metric' ? 'm/s' : 'mph'}` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Pressure: ${weatherData.main.pressure} hPa` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Visibility: ${weatherData.visibility / 1000} ${unitType === 'metric' ? 'm/s' : 'mph'}` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Cloudiness: ${weatherData.clouds.all}%` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}` : ''}</Text>
          <Text style={styles.text}>{weatherData ? `Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}` : ''}</Text>
          <Text>{error}</Text>
          <Text>{loading ? 'Loading...' : ''}</Text>
        </View>
        </View>
      </SafeAreaProvider>
    </ParallaxScrollView>
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
  headerImage: {
    alignSelf: 'center',
    marginTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  weatherMainContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  weatherIcon: {
    marginBottom: 12,
    alignSelf: 'center',
  },
});

export default App;
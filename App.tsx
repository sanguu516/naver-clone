import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import {RootStackParamList, RouteNames} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginButton from './components/LoginButton';
import LoginScreens from './screens/LoginScreens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
};

const shoppingIcon = ({focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
};
const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
      }}>
      <Tab.Screen
        name={RouteNames.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: HomeIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={RouteNames.SHOPPNIG}
        component={ShoppingScreen}
        options={{
          tabBarLabel: '쇼핑',
          tabBarIcon: shoppingIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.HOME_TAB}
          component={HomeTab}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'black'},
            headerRight: LoginButton,
          }}
        />
        <Stack.Screen
          name={RouteNames.BROWSER}
          component={BrowserScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.LOGIN}
          component={LoginScreens}
          options={{
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/user/HomeScreen";
import { colors } from "../../until";
import UserProfileScreen from "../../screens/profile/UserProfileScreen";
import MyOrderScreen from "../../screens/user/MyOrderScreen";
import BrandsScreen from "../../screens/user/BrandsScreen";
import { Icon } from "@rneui/themed";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;
          if (routename == "home") {
            return (
              <Icon name="home" size={30} type="font-awesome-5" color={focused ? colors.primary : colors.muted} />
            );
          } else if (routename == "brands") {
            return (
              <Icon name="apps" type="ionicon" size={30} color={focused ? colors.primary : colors.muted} />
            );
          } else if (routename == "myorder") {
            return (
              <Icon name="shopping-cart" type="font-awesome-5" size={30} color={focused ? colors.primary : colors.muted} />
            );
          } else if (routename == "user") {
            return (
              <Icon name="person" type="ionicon" size={30} color={focused ? colors.primary : colors.muted} />
            );
          }
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        tabBarOptions={{
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="brands"
        component={BrandsScreen}
        initialParams={{ brandSelected: {} }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
          style: {
            position: "absolute",
          },
        }}
      />
      {
        <Tab.Screen
          name="myorder"
          component={MyOrderScreen}
        />
      }
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
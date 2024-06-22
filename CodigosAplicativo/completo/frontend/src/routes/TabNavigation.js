import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';

import Settings from "../screens/Settings";
import Home from "../screens/Home";
import Books from "../screens/Books";
import AddBook from '../screens/addBooks';
import AddReaders from '../screens/AddReaders';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarInactiveTintColor: "#292937",
                tabBarActiveTintColor: "#3A89FF",
            }}>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="chart-bar" size={32} color={color} />
                }}
            />
            {/* <Tab.Screen
                name="books"
                component={Books}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={32} color={color} />
                }}
            /> */}
            <Tab.Screen
                name="readers"
                component={AddReaders}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={32} color={color} />
                }}
            />
            <Tab.Screen
                name="books"
                component={Books}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={32} color={color} />
                }}
            />
            <Tab.Screen
                name="add"
                component={AddBook}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="book-open" size={32} color={color} />
                }}
            />
            <Tab.Screen
                name="config"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="bookmarks-sharp" size={30} color={color} />
                }}
            />
        </Tab.Navigator>
    );
}

import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HeaderTitleWithIcon() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="film" size={20} color="#fff" />
            <Text style={{ color: '#fff', marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Películas</Text>
        </View>
    );
};

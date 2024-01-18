import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = ({ children, style }) => {
    return (
    <SafeAreaView style={[styles.container, style]}>
        {children}
    </SafeAreaView>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bcddd4',
        paddingVertical: 10
    },
});

export default Layout;

import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors, logout } from '../../until';
import { UserService } from '../../services';

const ScannerScreen = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = useCallback(async ({ type, data }) => {
        try {
            setScanned(true);

            const { type: codeType, code } = JSON.parse(data);

            if (codeType === 'product') {
                const { product = null, message = null } = await UserService.getProductByCode(code);

                if (product) {
                    navigation.replace('productdetail', { product });
                } else {
                    alert(message);
                    if (message === 'jwt expired') logout(navigation);
                }
            } else if (codeType === 'order') {
                const { order = null, message = null } = await UserService.getOrderByCode(code);

                if (order) {
                    navigation.replace('myorderdetail', { orderDetail: order });
                } else {
                    alert(message);
                    if (message === 'jwt expired') logout(navigation);
                }
            } else {
                alert('Invalid QR Code');
            }
        } catch (error) {
            alert(error);
        }
    }, [navigation, setScanned, logout]);


    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color={colors.primary} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default ScannerScreen;

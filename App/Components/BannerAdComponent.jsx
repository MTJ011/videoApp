import React, { useState, useRef } from 'react';
import { Button, Text } from 'react-native';
import { View } from 'react-native';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const BannerAdComponent = () => {

    return (
        <View>
            <Button title='hello ads'/>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    networkExtras: {
                        collapsible: 'bottom',
                    },
                }}
            />
        </View>
    )
}

export default BannerAdComponent
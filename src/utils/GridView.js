import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import GridStyles from '../useStyles/gridStyles';
const GridView = ({ navigation, data, actionText, actionStyles, handleGetNoteData=() =>{
    return null
} }) => {
    return (
        <ScrollView>
            <SafeAreaView style={GridStyles?.gridContainer}>  
                {data && data?.length > 0 && 
                   data?.map((each) => {
                    return (
                    <View key={each?.id} style={GridStyles.cardContainer}>
                        <View>
                            <Text style={GridStyles.title}>
                                {each?.title}
                            </Text>
                        </View>

                        <View>
                            <Text style={GridStyles.noteData} numberOfLines={6}>
                                {each?.noteData}
                            </Text>
                        </View>

                        <View style={{width:'100%'}}>
                            <TouchableOpacity style={GridStyles.TouchableButton}
                            onPress={() => {
                                handleGetNoteData(each)
                            }}
                            >
                                <Text style={{...GridStyles.viewStyles,...actionStyles}}>
                                    {actionText ? actionText : 'View'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}) 
                }
            </SafeAreaView>
        </ScrollView>
    );
}
export default GridView;

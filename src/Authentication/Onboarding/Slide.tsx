import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "../../compornents";


const {width, height} = Dimensions.get("window")
export const SLIDER_HEIGHT = 0.61 * height;
const styles = StyleSheet.create({
    container:{
        width
    },
    titleContainer:{
        height: 100,
        justifyContent:"center",
    },
})


interface SlideProps {
    label: string;
    right?: boolean;
}


const Slide = ({ label, right }: SlideProps) => {
    const transform = [
        {translateY: (SLIDER_HEIGHT - 100) / 2},
        {translateX: right ? (width / 2 - 50) : (-width / 2 + 50)},
        {rotate: right ? "-90deg" : "90deg"}
    ]
    return(
        <View style={styles.container}>
            <View style={[styles.titleContainer, {transform}]}>
                <Text variant="hero">{label}</Text>
            </View>
        </View>
    )
}

export default Slide
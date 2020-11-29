import React, { useRef } from "react"
import {Image, View, StyleSheet, Dimensions } from "react-native"
import Slide, { SLIDER_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import { useValue } from "react-native-redash/src/v1/Hooks"
import { interpolateColor } from 'react-native-redash/src/v1/Colors'
import { onScrollEvent } from 'react-native-redash/src/v1/Gesture'
import Animated, { divide, Extrapolate, interpolate, multiply } from 'react-native-reanimated';
import Dot from "./Dot";
import { theme } from "../../compornents";
import { Routes, StackNavigationProps } from "../../compornents/Navigation";

// const BORDER_RADIUS = 75
const { width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    slider: {
        height: SLIDER_HEIGHT,
        backgroundColor: "cyan",
        borderBottomRightRadius: theme.borderRadii.xl
    },
    footer: {
        flex: 1,
    },
    footerContent:{
        flex:1,        
        backgroundColor:"white",
        borderTopLeftRadius:theme.borderRadii.xl,
    },
    pagination:{ 
        ...StyleSheet.absoluteFillObject, 
        height:theme.borderRadii.xl,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        width
    },
    underlay:{
        ...StyleSheet.absoluteFillObject,
        alignItems:"center",
        justifyContent:"flex-end",
        borderBottomRightRadius: theme.borderRadii.xl,
        overflow:"hidden",
    }
})

const slides = [
    { 
        title: "Relaxed", 
        color: "#BFEAF5" ,  
        subtitle: "Find Your Outfits",
        description: "Confused about your outfit? Don't worry! Find the best outfit here!",
        picture:{
            src: require("../../../assets/1.png"),
            width: 2000,
            height: 2000
        }
    },
    { 
        title: "Playful", 
        color: "#BEECC4",
        subtitle: "Hear it First, Wear it First",
        description: "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
        picture:{
            src: require("../../../assets/2.png"),
            width: 1195,
            height: 1126
        }
    },
    { 
        title: "Excentric", 
        color: "#FEE4D9",
        subtitle: "Your Style, Your Way",
        description: "Create your individual & unique style and look amazing everyday",
        picture:{
            src: require("../../../assets/1.png"),
            width: 2000,
            height: 2000
        }
    },
    { 
        title: "Funky", 
        color: "#FFDDDD",
        subtitle: "Look Good, Feel Good",
        description: "Discover the latest trends in fashion and explore your personality",
        picture:{
            src: require("../../../assets/2.png"),
            width: 1195,
            height: 1126
        }
    }
]

export const assets = slides.map(slide => slide.picture.src);

const Onboarding = ({ navigation }: StackNavigationProps<Routes, "Onboarding">) => {
    const scroll = useRef<Animated.ScrollView>(null);
    const x = useValue(0)
    console.log("bbb")
    // TODO: scrollHandler useScrollHandler?
    const onScroll = onScrollEvent({ x })
    const backgroundColor = interpolateColor(
        x,
        {
            inputRange: slides.map((_, i) => i * width), // [0, width, width * 2, width * 3],
            outputRange: slides.map((slide) => slide.color)  //["#BFEAF5", "#BEECC4", "#FEE4D9", "#FFDDDD"]
        }
    )
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                {slides.map(({picture}, index) => {
                    const opacity = interpolate(x, {
                        inputRange: [
                            (index- 0.5) * width, 
                            index * width, 
                            (index + 0.5) * width
                        ],
                        outputRange: [0, 1, 0],
                        extrapolate: Extrapolate.CLAMP
                    })
                    return (
                        <Animated.View style={[styles.underlay, {opacity}]} key={index}>
                            <Image
                                source = {picture .src}
                                style={{
                                    width: width - theme.borderRadii.xl,
                                    height: ((width - theme.borderRadii.xl) * picture.height) / picture.width
                                }}
                            />
                        </Animated.View>
                    )
                })}
                
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{ onScroll }} // {...onScroll}
                >
                    {slides.map(({ title }, index) => (
                            <Slide key={index} right={!!(index % 2)} label={title} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View
                    style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
                />
                <View 
                    style={styles.footerContent}
                >
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (<Dot key={index} currentIndex={divide(x, width)} {...{index}} />))}
                    </View>
                    <Animated.View style={{flex:1, flexDirection:"row", width: width * slides.length ,transform:[{translateX: multiply(x, -1)}]}}>
                        {slides.map(({ subtitle, description }, index) => {
                            const last = index === slides.length -1
                            return (
                                <Subslide 
                                    key={index} 
                                    onPress={() => {
                                        if(last){                                            
                                            // console.log("aaa")
                                            navigation.navigate("Welcome")
                                        }
                                        else{
                                            scroll.current
                                                ?.getNode()
                                                .scrollTo({x: width * (index + 1), animated: true})
                                        }
                                    }}
                                    {...{subtitle, description, last}}
                                />
                            )
                        })}
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

export default Onboarding
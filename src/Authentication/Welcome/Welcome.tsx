import React from 'react'
import { Dimensions, Image } from 'react-native'
import { Box, Button, Text, theme } from '../../compornents'

// interface WelcomeProps

const { width } = Dimensions.get("window")
const picture = {
    src: require('../../../assets/2.png'),
    width: 500,
    height: 500
}

export const assets = [picture.src]
const Welcome = () => {
    return (
        <Box flex={1} backgroundColor="white">
            <Box flex={1} borderBottomRightRadius="xl" backgroundColor="grey" justifyContent="flex-end" alignItems="center" overflow="hidden">
                <Image 
                    source={picture.src} 
                    style={{
                        width: width - theme.borderRadii.xl,
                        height: ((width - theme.borderRadii.xl) * picture.height) / picture.width
                    }}
                />
            </Box>
            <Box flex={1} borderTopLeftRadius="xl">
                <Box 
                    backgroundColor="grey" 
                    position="absolute" 
                    top={0} 
                    left={0} 
                    right={0} 
                    bottom={0}
                />
                <Box backgroundColor="white"  borderTopLeftRadius="xl" justifyContent="space-evenly" alignItems="center" flex={1} padding="xl">
                    <Text variant="title2">Let's get started</Text>
                    <Text variant="body" textAlign="center">Login to your account below or signuo for an amazing experience</Text>
                    <Button variant="primary" label="Have an account? Login" />
                    <Button label="Join us, it's Free" />
                    <Button variant="transparent" label="Forgot password?" />
                </Box>
            </Box>
        </Box>
    )
}

export default Welcome

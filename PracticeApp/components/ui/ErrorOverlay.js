import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from '../../contants/styles'
import Button from "./Button";

const ErrorOverlay = ({ message, onConfirm }) => {
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
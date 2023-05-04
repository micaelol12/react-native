import { StyleSheet } from "react-native";
import { ActivityIndicator, View } from "react-native";
import { GlobalStyles } from '../../contants/styles'

const LoadingOverlay = () => {
    return <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
    </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
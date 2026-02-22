import { View, Text, Button } from "react-native";
import { useTheme } from "../theme/useTheme";

export default function HomeScreen() {
    const theme = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background
        }}>
            <Text style={{ color: theme.text }}>Weather Voice App</Text>

            <Button title="Record Audio" onPress={() => {}}/>
        </View>
    )
}
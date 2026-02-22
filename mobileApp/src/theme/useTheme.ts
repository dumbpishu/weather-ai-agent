import { useColorScheme } from "react-native";

export const useTheme = () => {
    const schema = useColorScheme();
    const isDark = schema === "dark";

    console.log(isDark)

    return {
        isDark,
        background: "#fff",
        text: "#000"
    }
}
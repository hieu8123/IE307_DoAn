import AsyncStorage from "@react-native-async-storage/async-storage";

export const splashImages = [
    {
        image: require("../assets/logo/logo.png")
    },
    {
        image: require("../assets/logo/logo_75.png")
    },
    {
        image: require("../assets/logo/logo_50.png")
    },
    {
        image: require("../assets/logo/logo_75.png")
    },
    {
        image: require("../assets/logo/logo.png")
    },
]

export const colors = {
    primary: "#31B0FB",
    primary_light: "#FFC8B2",
    primary_shadow: "#04A1FB",
    secondary: "#fc7b03",
    tertiary: "#AEE8FD",
    success: "#90ee90",
    danger: "#FF4848",
    shadow: "#E7E8EA",
    warning: "#FBD431",
    info: "#F8F9FA",
    light: "#F5F5F5",
    dark: "#343A3F",
    muted: "#707981",
    white: "#FFFFFF",
};

export const network = {
    serverip: "http://192.168.1.109:8080",
};

export const getAuthUser = async () => {
    try {
        const value = await AsyncStorage.getItem("authUser");
        if (value !== null) {
            const user = JSON.parse(value);
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting authUser from AsyncStorage:", error);
        return null;
    }
};

export const setAuthUser = async (user) => {
    try {
        const jsonUser = JSON.stringify(user);
        await AsyncStorage.setItem("authUser", jsonUser);
    } catch (error) {
        console.error("Error setting authUser in AsyncStorage:", error);
    }
};

export const banners = [
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/IP15-720-220-720x220-3.png',
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/C53-HC-720-220-720x220-4.png',
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/Vivo-Y17s-720-220-720x220-3.png',
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/12/banner/720-220-min-720x220-1.png',
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/banner/Le-hoi-OPPO-720-220-720x220-2.png',
]

export const logout = async (navigation) => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
};

export const dateFormat = (datex) => {
    let t = new Date(datex);
    const date = ("0" + t.getDate()).slice(-2);
    const month = ("0" + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const newDate = `${date}-${month}-${year}`;
    return newDate;
};

export const getTime = (date) => {
    let t = new Date(date);
    const hours = ("0" + t.getHours()).slice(-2);
    const minutes = ("0" + t.getMinutes()).slice(-2);
    const seconds = ("0" + t.getSeconds()).slice(-2);
    let time = `${hours}:${minutes}:${seconds}`;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
        time,
    ];

    if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? " AM" : " PM";
        time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
}

export const timeoutHandler = async (promise) => {
    const timeoutDuration = 5000;
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timeout'));
        }, timeoutDuration);
    });

    return Promise.race([promise, timeoutPromise]);
};
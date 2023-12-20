import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/auth/Splash";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import UpdatePasswordScreen from "../screens/profile/UpdatePasswordScreen";
import MyAccountScreen from "../screens/profile/MyAccountScreen";
import AddProductScreen from "../screens/admin/AddProductScreen";
import DashboardScreen from "../screens/admin/DashboardScreen";
import ViewProductScreen from "../screens/admin/ViewProductScreen";
import Tabs from "./tabs/Tabs";
import CartScreen from "../screens/user/CartScreen";
import CheckoutScreen from "../screens/user/CheckoutScreen.js";
import OrderConfirmScreen from "../screens/user/OrderConfirmScreen";
import ProductDetailScreen from "../screens/user/ProductDetailScreen";
import EditProductScreen from "../screens/admin/EditProductScreen";
import ViewOrdersScreen from "../screens/admin/ViewOrdersScreen";
import ViewOrderDetailScreen from "../screens/admin/ViewOrderDetailScreen";
import MyOrderScreen from "../screens/user/MyOrderScreen";
import MyOrderDetailScreen from "../screens/user/MyOrderDetailScreen";
import ViewUsersScreen from "../screens/admin/ViewUsersScreen";
import MyWishlistScreen from "../screens/profile/MyWishlistScreen";
import BrandsScreen from "../screens/user/BrandsScreen.js";
import EditBrandScreen from "../screens/admin/EditBrandScreen.js";
import AddBrandScreen from "../screens/admin/AddBrandScreen.js";
import ViewBrandScreen from "../screens/admin/ViewBrandScreen.js";
import ScannerScreen from "../screens/user/ScannerScreen.js";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgetpassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="mywishlist" component={MyWishlistScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
        <Stack.Screen name="addproduct" component={AddProductScreen} />
        <Stack.Screen name="viewproduct" component={ViewProductScreen} />
        <Stack.Screen name="editproduct" component={EditProductScreen} />
        <Stack.Screen name="tab" component={Tabs} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="orderconfirm" component={OrderConfirmScreen} />
        <Stack.Screen name="productdetail" component={ProductDetailScreen} />
        <Stack.Screen name="vieworder" component={ViewOrdersScreen} />
        <Stack.Screen name="vieworderdetails" component={ViewOrderDetailScreen} />
        <Stack.Screen name="myorder" component={MyOrderScreen} />
        <Stack.Screen name="myorderdetail" component={MyOrderDetailScreen} />
        <Stack.Screen name="viewbrands" component={ViewBrandScreen} />
        <Stack.Screen name="addbrands" component={AddBrandScreen} />
        <Stack.Screen name="editbrands" component={EditBrandScreen} />
        <Stack.Screen name="viewusers" component={ViewUsersScreen} />
        <Stack.Screen name="brands" component={BrandsScreen} />
        <Stack.Screen name="scanner" component={ScannerScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import { createStackNavigator } from '@react-navigation/stack';
import Admin from './AdminScreen';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import CreateCategory from './CreateCategory';
import CategoryList from './CategoryList';


const Stack = createStackNavigator();

export default function AdminHome({navigation}) {
    return (
    
      <Stack.Navigator
        initialRouteName="Admin"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name='CreateProduct' component={CreateProduct} />
        <Stack.Screen name='UpdateProduct' component={UpdateProduct} />

        <Stack.Screen name='CreateCategory' component={CreateCategory} />
        <Stack.Screen name='CategoryList' component={CategoryList} />
      </Stack.Navigator>
   
    );
  }
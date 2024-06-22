import { NavigationContainer} from "@react-navigation/native"
import TabRoutes from "./TabNavigation"
import Search from "../components/SearchBar"

export default function Routes(){
    return(
        <NavigationContainer>
            <Search/>
            <TabRoutes/>
        </NavigationContainer>
    )
}
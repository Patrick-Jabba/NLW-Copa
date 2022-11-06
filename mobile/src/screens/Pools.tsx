import { Icon, useNativeBase, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import { Header } from "../components/Header";
import { Button } from "../components/Button";

export function Pools() {
  const {navigate} = useNavigation();

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header 
      title="MEUS BOLÕES"
      />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
        title="BUSCAR BOLÃO POR CÓDIGO" 
        leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}  
        onPress={() => navigate('find')}
        />
      </VStack>
    </VStack>
  );
}

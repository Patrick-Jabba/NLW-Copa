import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";


import { api } from "../services/api";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function Find(){
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool(){
    try {
      setIsLoading(true);

      if(!code.trim()){
        return toast.show({
          title: 'Informe o código.',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('/pools/join', { code });
      navigate('pools');

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500'
      })

    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if(error.response?.data?.message === 'Pool not found'){
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500'
        });
      }
      if(error.response?.data?.message === 'You already join this pool.'){
        return toast.show({
          title: 'Você já está participando deste bolão.',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton/>
      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
        Encontre um bolão através de {'\n'} seu código único
        </Heading>

        <Input
        mb={2}
        placeholder="Qual o código do bolão?"
        onChangeText={setCode}
        autoCapitalize="characters"
        />

        <Button
        title="BUSCAR BOLÃO"
        onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}
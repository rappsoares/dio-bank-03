import { useContext } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { AppContext } from "../components/AppContext";

const ContaInfo = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      <Center>
        <Text fontSize="3xl" fontWeight="bold" color="white" marginTop="10px">
          Informações da conta
        </Text>
      </Center>
      <Box backgroundColor="gray.100" padding="20px" margin="35px" borderRadius="15px">
        <Text fontSize="xl" marginBottom="10px">
          <b>ID:</b> {user?.id}
        </Text>
        <Text fontSize="xl" marginBottom="10px">
          <b>Nome:</b> {user?.name}
        </Text>
        <Text fontSize="xl" marginBottom="10px">
          <b>Email:</b> {user?.email}
        </Text>
      </Box>
    </>
  );
};

export default ContaInfo;

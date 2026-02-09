import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { changeLocalStorage } from "../services/storage";
import { AppContext } from "./AppContext";

export const Header = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  if (!isLoggedIn || !user) return null;

  const logout = () => {
    changeLocalStorage({ login: false, user: null });
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <Flex backgroundColor="orange" padding="5px">
      <Box>
        <Center>
          <Text fontSize="3xl" fontWeight="bold">
            Dio Bank
          </Text>
        </Center>
      </Box>
      {isLoggedIn && (
        <>
          <Spacer />
          <Flex gap="10px">
            <Button onClick={() => navigate(`/conta/${user.id}`)}>Conta</Button>
            <Button onClick={() => navigate("/infoconta")}>Info Conta</Button>
            <Button onClick={() => logout()}>Sair</Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

import { api } from "../api";
import CardInfo from "../components/CardInfo";
import { AppContext } from "../components/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";

interface UserData {
  email: string;
  password: string;
  name: string;
  balance: number;
  id: string;
}

const Conta = () => {
  const [userData, setUserData] = useState<null | UserData>();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AppContext);

  !isLoggedIn && navigate("/");

  useEffect(() => {
    const getData = async () => {
      const data: any | UserData = await api;
      setUserData(data);
    };

    getData();
  }, []);

  const actualData = new Date();
  const hours = String(actualData.getHours()).padStart(2, "0");
  const minutes = String(actualData.getMinutes()).padStart(2, "0");

  if (userData && id !== userData.id) {
    navigate("/");
  }

  return (
    <Center>
      <SimpleGrid columns={2} spacing={8} paddingTop={16}>
        {userData === undefined || userData === null ? (
          <Center>
            <Spinner size="xl" color="white" />
          </Center>
        ) : (
          <>
            <CardInfo
              mainContent={`Bem vinda, ${userData?.name}!`}
              content={`${actualData.toLocaleDateString()} - ${hours}:${minutes}`}
            />
            <CardInfo mainContent="Saldo" content={`R$ ${userData.balance}`} />
          </>
        )}
      </SimpleGrid>
    </Center>
  );
};

export default Conta;

import { Box, Center, Input } from "@chakra-ui/react";
import { MouseEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage } from "../services/storage";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setIsLoggedIn, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const validateUser = async (email: string, password: string) => {
    const loggedIn = await login(email, password);

    if (!loggedIn.sucess) {
      if (loggedIn.error === "email") return alert("Email inválido");
      if (loggedIn.error === "password") return alert("Senha inválida");
      if (loggedIn.error === "both") return alert("Email e senha inválidos");
      return;
    }

    setIsLoggedIn(true);
    setUser(loggedIn.user);
    changeLocalStorage({
      login: true,
      user: {
        id: loggedIn.user.id,
        name: loggedIn.user.name,
        email: loggedIn.user.email,
      },
    });
    navigate(`/conta/${loggedIn.user.id}`);
  };

  return (
    <Box padding="25px">
      <Card>
        <Center>
          <h1>Faça o login</h1>
        </Center>
        <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Center>
          <DButton onClick={() => validateUser(email, password)} />
        </Center>
      </Card>
    </Box>
  );
};

export default Home;

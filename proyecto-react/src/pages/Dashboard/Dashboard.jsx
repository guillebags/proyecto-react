import { useEffect, useState } from "react";
import { Header, Sidebar } from "../../components";
import { useAuth } from "../../context/authContext";
import { useAcquired } from "../../hooks/useAcquired";

import "./Dashboard.css";
import { Card, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const userDataResponse = await useAcquired(user._id);
      setUserData(userDataResponse);
    };
    getData();
  }, []);

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex direction="column" w="80vw">
          <Header />
          <Heading p="5" color="black">
            Library
          </Heading>
          <Flex gap="10" p="5">
            {userData?.acquired?.map(({ gameId }) => (
              <Card key={gameId._id} borderRadius="15">
                <Center flexDir="column">
                  <Image
                    w="3xs"
                    h="2xs"
                    objectFit="cover"
                    src={gameId.image}
                    alt={gameId.name}
                    borderRadius="15"
                  />
                  <Link to={`/home/detail/${gameId._id}`}>
                    {gameId?.name} || {gameId?.genre}
                  </Link>
                </Center>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

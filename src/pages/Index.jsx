import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, Image, Grid, GridItem, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { FaSearch, FaUser } from "react-icons/fa";

const API_URL = "https://backengine-4b1w.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <Box bg="blue.500" p={4} color="white">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems="center">
          <GridItem>
            <Heading size="xl">eBay</Heading>
          </GridItem>
          <GridItem>
            <Input placeholder="Search" size="lg" />
            <Button leftIcon={<FaSearch />} ml={2} colorScheme="teal">
              Search
            </Button>
          </GridItem>
          <GridItem textAlign="right">
            {isLoggedIn ? (
              <Text>
                Welcome! <FaUser />
              </Text>
            ) : (
              <>
                <FormControl id="email" mb={2}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" mb={2}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button onClick={handleLogin} colorScheme="teal" mr={2}>
                  Login
                </Button>
                <Button onClick={handleSignup} colorScheme="teal">
                  Signup
                </Button>
              </>
            )}
          </GridItem>
        </Grid>
      </Box>
      <Box p={4}>
        <Heading mb={4}>Featured Items</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {[1, 2, 3, 4].map((item) => (
            <GridItem key={item}>
              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Image src={`https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwJTI0JTdCaXRlbSU3RHxlbnwwfHx8fDE3MTE4NjE4NTd8MA&ixlib=rb-4.0.3&q=80&w=1080`} alt={`Product ${item}`} mb={2} />
                <Heading size="md">Product {item}</Heading>
                <Text>Description of product {item}</Text>
                <Text fontWeight="bold">$19.99</Text>
                <Button colorScheme="blue" size="sm" mt={2}>
                  Buy Now
                </Button>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;

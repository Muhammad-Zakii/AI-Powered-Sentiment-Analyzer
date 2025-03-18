import { useState } from "react";
import {
  Stack,
  Input,
  Box,
  Center,
  Button,
  HStack,
  useBreakpointValue,
  Spinner,
  Text,
  Card,
} from "@chakra-ui/react";

import { RiSearchLine } from "react-icons/ri";

const MainComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const placeholderText = useBreakpointValue({
    base: "How do you feel today?",
    md: "How do you feel today? Type something...",
  });

  const handleSubmit = async () => {
    if (!inputValue.trim()) return; // Prevent empty submissions

    setLoading(true);
    setSentiment(null); // Clear previous results

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      });

      const data = await response.json();

      setSentiment(data); // Store API response
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center minH="100vh" px={4}>
      <Box width={{ base: "90%", md: "60%", lg: "50%" }}>
        <Stack spacing={6}>
          <Box
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            textAlign="center"
            mb={4}
            color={"lime"}
          >
            Type a Sentence to Analyze Sentiment
          </Box>

          <HStack spacing={3} flexDirection={{ base: "column", md: "row" }}>
            <Input
              css={{ "--focus-color": "lime" }}
              placeholder={placeholderText}
              size="lg"
              width="100%"
              p={3}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="outline"
              size="lg"
              width={{ base: "100%", md: "auto" }}
              onClick={handleSubmit}
              isDisabled={loading}
              color="lime"
              borderColor="lime" // Optional: Makes the border lime as well
              _hover={{ bg: "lime", color: "black" }}
            >
              {loading ? <Spinner size="sm" /> : "Analyze Sentiment"}
            </Button>
          </HStack>

          {sentiment && (
            <Card.Root
              borderBlockColor={"lime"}
              variant="outline"
              p={4}
              boxShadow="md"
            >
              <Card.Header>
                <Text color={"lime"} fontSize="lg" fontWeight="bold">
                  Sentiment Result:
                </Text>
              </Card.Header>
              <Card.Body>
                <Text fontSize="lg" mt={2}>
                  {sentiment?.sentiment}{" "}
                  {/* Adjust based on API response structure */}
                </Text>
              </Card.Body>
            </Card.Root>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default MainComponent;

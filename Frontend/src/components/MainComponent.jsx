import {
  Field,
  Stack,
  Input,
  Box,
  Center,
  Button,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";

const MainComponents = () => {
  const placeholderText = useBreakpointValue({
    base: "How do you feel today?", // Small screens
    md: "How do you feel today? Type something...", // Medium and larger screens
  });
  return (
    <Center minH="100vh">
      {" "}
      {/* Centers everything vertically and horizontally */}
      <Box width="50%">
        {" "}
        {/* Adjust width as needed */}
        <Stack>
          <Field.Root>
            <Field.Label>
              <Box
                fontSize={{ md: "lg", sm: "sm" }}
                fontWeight="bold"
                textAlign="center"
                mb={5}
              >
                Type a Sentence to Check Sentiment
              </Box>
            </Field.Label>
            <HStack
              width={{ md: "100%", sm: "50%" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Input
                placeholder={placeholderText}
                css={{ "--focus-color": "lime" }}
                size={{ md: "lg", sm: "sm" }} // Increases input size
                padding="2"
              />
              <Button
                size={{ md: "lg", sm: "sm" }}
                colorPalette="teal"
                variant="outline"
                padding="2"
              >
                Analyze Sentiment <RiArrowRightLine />
              </Button>
            </HStack>
          </Field.Root>
        </Stack>
      </Box>
    </Center>
  );
};

export default MainComponents;

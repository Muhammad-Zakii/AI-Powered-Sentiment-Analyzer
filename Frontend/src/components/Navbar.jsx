import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box px={4} py={3} boxShadow="md">
      <Flex justify="center">
        <Text fontSize="xl" fontWeight="bold" color="lime">
          AI Sentiment Analyzer
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;

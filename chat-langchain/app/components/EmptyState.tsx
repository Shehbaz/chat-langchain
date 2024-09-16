import { Heading } from '@chakra-ui/react';

export function EmptyState() {
  return (
    <div className="p-8 rounded flex flex-col items-center">
      <Heading
        as="h1"
        fontSize="4xl"
        fontWeight="bold"
        color="teal.300"
        mb={4}
        letterSpacing="wider"
        _hover={{ color: "teal.400" }} // Removed cursor style to indicate it's not clickable
      >
        Chat Devbox
      </Heading>
      <Heading
        as="h2"
        fontSize="2xl"
        fontWeight="normal"
        color="gray.300"
        mb={4}
        textAlign="center"
      >
        How can I help you today?
      </Heading>
    </div>
  );
}

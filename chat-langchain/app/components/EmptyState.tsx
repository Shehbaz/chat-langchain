import { MouseEvent } from 'react';
import { Heading } from '@chakra-ui/react';

export function EmptyState({ onChoice }) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onChoice(e.target.innerText);
  };

  return (
    <div className="p-8 rounded flex flex-col items-center">
      <Heading
        as="h1"
        fontSize="4xl"
        fontWeight="bold"
        color="teal.300"
        mb={4}
        letterSpacing="wider"
        _hover={{ color: "teal.400", cursor: "pointer" }}
        onClick={handleClick}
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

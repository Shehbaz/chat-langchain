// components/Navbar.js
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex color="white" justifyContent="space-between" style={{"padding": "0px 1rem", 'borderBottom': '1px solid gray'}}>
      <Box>
        <Text fontSize="xl" fontWeight="bold">devbox<span style={{color: '#3182ce'}}>.ai</span></Text>
      </Box>
      <Box style={{padding: '10px'}}>
        <Link href="/upload" marginRight="2rem" isExternal textDecoration="none" _hover={{ color: '#3182ce', textDecoration: 'none' }}>Add Pdf</Link>
        <Link href="/website-upload" isExternal textDecoration="none" _hover={{ color: '#3182ce', textDecoration: 'none' }}>Add Url</Link>
      </Box>
    </Flex>
  );
};

export default Navbar;

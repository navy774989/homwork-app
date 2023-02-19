import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <InputGroup pt={4}>
      <Input></Input>
      <InputRightAddon
        p={0}
        children={
          <Button
            colorScheme={"cyan"}
            textColor={"white"}
            borderLeftRadius={0}
            w={"full"}
            m={0}
          >
            Search
          </Button>
        }
      />
    </InputGroup>
  );
};
export default SearchInput;

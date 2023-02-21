import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch } from "react-redux";
import { setQuery } from "../redux/reducers/search";
import debounce from "lodash.debounce";
import React from "react";
import { fetchQuestions } from "../redux/reducers/questions";
import { useAppSelector } from "../hooks/useAppSelector";
import { AppDispatch } from "../redux/store";
const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: setQuery.type, payload: event.target.value });
  };
  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 300),
    []
  );
  const tagName = useAppSelector(
    (state) => state.tags.selectedTag?.name,
    shallowEqual
  );
  const query = useAppSelector((state) => state.search.query, shallowEqual);
  const onPress = () => {
    dispatch(
      fetchQuestions({
        tags: tagName,
        page: 1,
        q: query,
      })
    );
  };
  return (
    <InputGroup pt={4}>
      <Input onChange={debouncedChangeHandler}></Input>
      <InputRightAddon
        p={0}
        children={
          <Button
            onClick={onPress}
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

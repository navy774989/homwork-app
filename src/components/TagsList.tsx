import { Tag, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchTags, OnTagSelect } from "../redux/reducers/tags";
import { AppDispatch } from "../redux/store";

const TagsList = () => {
  const tags = useAppSelector((state) => state.tags.tags, shallowEqual);
  const selectedTag = useAppSelector(
    (state) => state.tags.selectedTag,
    shallowEqual
  );
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);
  return (
    <Wrap pb={10}>
      {tags?.map((item, idx) => (
        <WrapItem key={item.name}>
          <Tag
            onClick={() =>
              dispatch({ type: OnTagSelect.type, payload: { itemIdx: idx } })
            }
            size={"lg"}
            cursor={item.name === selectedTag?.name ? "unset" : "pointer"}
            variant={item.name === selectedTag?.name ? "solid" : "outline"}
            colorScheme="cyan"
          >
            {item.name}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
};
export default TagsList;

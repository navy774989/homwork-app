import {
  Box,
  HStack,
  Image,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faEye,
  faSquarePollVertical,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/useAppSelector";
import { QuestionProps } from "../redux/apis/types/QuestionsProps";
import { fetchQuestions } from "../redux/reducers/questions";
import { AppDispatch } from "../redux/store";
import { useMediaQuery } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
const QuestionsList = () => {
  const currentPage = React.useRef(1);
  const dispatch = useDispatch<AppDispatch>();
  const selectedTag = useAppSelector(
    (state) => state.tags.selectedTag,
    shallowEqual
  );
  const query = useAppSelector((state) => state.search.query, shallowEqual);
  const loading = useAppSelector((state) => state.tags.loading, shallowEqual);
  const { questions } = useAppSelector(
    (state) => state.questions,
    shallowEqual
  );
  const questionsLoading = useAppSelector((state) => state.questions.loading);
  React.useEffect(() => {
    if (loading === "succeeded") {
      currentPage.current = 1;
      dispatch(
        fetchQuestions({
          tags: selectedTag?.name,
          page: currentPage.current,
          q: query,
        })
      );
    }
  }, [selectedTag, loading, query]);
  const onNext = () => {
    currentPage.current = currentPage.current + 1;
    if (loading != "pending") {
      dispatch(
        fetchQuestions({
          tags: selectedTag?.name,
          page: currentPage.current,
          q: query,
        })
      );
    }
  };
  return (
    <VStack w={"full"}>
      <InfiniteScroll
        className=""
        dataLength={questions.length}
        next={onNext}
        hasMore={true}
        loader={null}
      >
        {questions.map((item) => {
          return <QuestionItem key={item.link} data={item} />;
        })}
      </InfiniteScroll>
      {questionsLoading === "pending" && <LoadingUI />}
    </VStack>
  );
};
const LoadingUI = () => {
  const [isLargerThan30em] = useMediaQuery("(min-width: 30em)");
  return (
    <VStack w={"full"}>
      {Array(isLargerThan30em ? 7 : 4)
        .fill(0)
        .map((item, idx) => {
          return (
            <Box
              key={"loading_" + idx}
              borderWidth={1}
              borderColor={"gray.200"}
              w={"full"}
              rounded={6}
              padding={3}
              bg="white"
            >
              <SkeletonCircle size="5" />
              <SkeletonText
                mt="4"
                noOfLines={3}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          );
        })}
    </VStack>
  );
};
const QuestionItem = ({ data }: { data: QuestionProps }) => {
  const [isLargerThan30em] = useMediaQuery("(min-width: 30em)");
  return (
    <VStack
      w={"full"}
      justify={"start"}
      align={"start"}
      borderWidth={1}
      borderColor={"gray.200"}
      padding={3}
      rounded={6}
      mb={3}
    >
      <HStack w={"full"}>
        <Image w={5} h={5} rounded={"full"} src={data?.owner?.profile_image} />
        <Text fontSize={16} color={"gray.600"}>
          {data?.owner?.display_name}
        </Text>
      </HStack>
      <Text fontSize={20} fontWeight={"bold"} textAlign={"start"}>
        {data.title}
      </Text>
      <HStack w={"full"}>
        <HStack flex={1}>
          <FontAwesomeIcon color={"#F6E05E"} icon={faStar} />
          {isLargerThan30em && <Text>Score:</Text>}
          <Text
            w={"full"}
            fontSize={18}
            color={data.score < 0 ? "red.400" : "black"}
          >
            {data.score}
          </Text>
        </HStack>
        <HStack flex={1}>
          <FontAwesomeIcon color={"#48BB78"} icon={faSquarePollVertical} />
          {isLargerThan30em && <Text>Answer:</Text>}
          <Text
            w={"full"}
            fontSize={18}
            color={data.score < 0 ? "red.400" : "black"}
            borderWidth={
              !data.accepted_answer_id && data.answer_count > 0 ? 1 : 0
            }
            backgroundColor={
              data.accepted_answer_id && data.answer_count > 0
                ? "green.300"
                : "white"
            }
            borderColor={"gray.300"}
          >
            {data.answer_count}
          </Text>
        </HStack>
        <HStack flex={1}>
          <FontAwesomeIcon color={"#4299E1"} icon={faEye} />
          {isLargerThan30em && <Text>Viewed:</Text>}
          <Text w={"full"} fontSize={18}>
            {data.view_count}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
export default QuestionsList;

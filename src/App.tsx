import React from "react";
import "./App.css";
import { Stack, VStack } from "@chakra-ui/react";
import TagsList from "./components/TagsList";
import SearchInput from "./components/SearchInput";

import QuestionsList from "./components/QuestionsList";

function App() {
  return (
    <div className="App">
      <VStack w={"100%"} paddingX={4} justify={"center"} align={"center"}>
        <VStack w={{ sm: "100%", md: "75%", lg: "65%", xl: "55%" }}>
          <VStack bgColor={"white"} position={"sticky"} top={0} w={"full"}>
            <SearchInput />
            <TagsList />
          </VStack>

          <QuestionsList />
        </VStack>
      </VStack>
    </div>
  );
}

export default App;

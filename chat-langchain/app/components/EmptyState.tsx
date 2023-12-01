import { MouseEvent, MouseEventHandler } from "react";
import { Heading, Link, Card, CardHeader, Flex, Spacer } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'

export function EmptyState(props: {
  onChoice: (question: string) => any
}) {
  const handleClick = (e: MouseEvent) => {
    props.onChoice((e.target as HTMLDivElement).innerText);
  }
  return (
    <div className="p-8 rounded flex flex-col items-center">
      <Heading fontSize="3xl" fontWeight={"medium"} mb={1} color={"white"}>Chat Devbox</Heading>
      <Heading fontSize="xl" fontWeight={"normal"} mb={1} color={"white"} marginTop={"10px"} textAlign={"center"}>Ask me anything about Devbox&apos;s{" "}
      <Link href='https://devboxtech.co.uk' color={"blue.200"}>
        documentation!
      </Link></Heading>
    </div>
  );
}
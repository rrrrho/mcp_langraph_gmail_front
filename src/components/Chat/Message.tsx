import { Box, Stack } from "@mantine/core";

type MessageProps = {
    text: string;
    sender: 'user' | 'agent';
}

const Message = ({ text, sender }: MessageProps) => {
    return (
        sender === 'user' ? (
            <Stack align="flex-end">
                <Box 
                bg={"#F8C8DC"} 
                px={15} 
                py={5}
                bdrs={20}
                pos={"relative"}
                maw={"75%"}
                >
                {text}</Box>
            </Stack>
        ) : (
            <Stack>
                <Box
                bg={"#FFF5EE"} 
                px={15} 
                py={5}
                bdrs={20}
                pos={"relative"}
                maw={"75%"}
                >{text}</Box>
            </Stack>
        )
    )
}

export default Message;
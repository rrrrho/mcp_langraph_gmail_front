import { Box, Stack } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import Message from "./Conversation/Message.tsx";
import type { Ref } from "react";

type ChatBoxProps = {
    isChatStarted: boolean,
    messages: string[],
    viewportRef: Ref<HTMLDivElement>
}

const ChatBox = ({isChatStarted, messages, viewportRef}: ChatBoxProps) => {
    return (
        <Box 
        flex={isChatStarted? 1 : 0} 
        style={{ overflowY: 'auto', position: 'relative'  }}
        className='area' 
        ref={viewportRef}
        w={{ base: '80vw', xl: '35vw'}}
        >
            <AnimatePresence>
                {isChatStarted && (
                    <Stack gap="lg" pb={100} px={10}> {/* padding bottom para que el ultimo msj no quede pegado al input */}
                        {messages.map((msg, index) => (
                            
                            <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ 
                                display: 'flex', 
                                justifyContent: msg.startsWith('User:') ? 'flex-end' : 'flex-start',
                                gap: 4
                            }}
                            >
                                <Message msg={msg} />
                            </motion.div>
                        ))}
                    </Stack>
                )}
                </AnimatePresence>
        </Box>
    )
}

export default ChatBox;
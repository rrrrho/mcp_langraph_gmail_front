import { Avatar, Flex, rem, Stack, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./Welcome/GradientText";
import Sender from "./Sender";
import Image from '../../assets/logo.png'

type InputBoxProps = {
    isChatStarted: boolean;
    isLoading: boolean;
    inputMessage: string;
    stopStreaming: () => void;
    sendMessage: () => void;
    setInputMessage: (value: string) => void;
}

const InputBox = ({isChatStarted, isLoading, stopStreaming, sendMessage, setInputMessage, inputMessage}: InputBoxProps) => {
    return (
        <motion.div
        layout
        transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
        style={{
        width: '100%',
        marginTop: isChatStarted ? 0 : 'auto', 
        marginBottom: isChatStarted ? rem(20) : 'auto',
        zIndex: 10
        }}
        >
            <Stack align="center" gap="lg">
                <AnimatePresence>
                    {!isChatStarted && (
                        <motion.div
                            initial={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Flex>
                            
                            <Avatar src={Image}
                            h={{ base: '4rem', sm: '5rem' }} 
                            w={{ base: '4rem', sm: '5rem'}}  pb={6}/>
                            <GradientText
                            colors={["#9F170C", "#CE1E10", "#EE3223", "#F25E52", "#F68A81"]}
                            animationSpeed={3}
                            showBorder={false}
                            size={{base: '1.8rem', sm: '2.5rem'}}
                            >
                            How can I help you?
                            </GradientText>
                            </Flex>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Sender 
                stopStreaming={stopStreaming}
                isLoading={isLoading} 
                inputMessage={inputMessage} 
                sendMessage={sendMessage} 
                setInputMessage={setInputMessage} />

                {!isChatStarted && (
                    <motion.div exit={{ opacity: 0 }}>
                        <Text size="xs" c="dimmed">Presiona Enter para comenzar</Text>
                    </motion.div>
                )}
            </Stack>
        </motion.div>
    )
}

export default InputBox;
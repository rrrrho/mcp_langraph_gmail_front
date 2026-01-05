import { useRef } from 'react'
import './../App.css'
import { Stack } from '@mantine/core'
import ChatBox from '../components/Chat/ChatBox'
import InputBox from '../components/Chat/InputBox'
import { useChatStream } from '../hooks/useChatStream'
import { useAuth } from '../context/AuthContext'


const Chat = () => {
    const { isAuthenticated } = useAuth();
    const viewportRef = useRef<HTMLDivElement>(null);
    const { messages, isChatStarted, sendMessage, stopStreaming, isLoading } = useChatStream();

    const handleSendMessage = (value: string) => {
        if (!isAuthenticated) return;

        sendMessage(value);
    };

    return (
        <Stack 
        py={isChatStarted ? 50 : 0} 
        align='center'
        h={'90vh'}
        >
            {/* message area */}
            <ChatBox isChatStarted={isChatStarted} messages={messages} viewportRef={viewportRef}/>

            {/* input area */}
            <InputBox 
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            stopStreaming={stopStreaming}
            isChatStarted={isChatStarted}/>
        </Stack>
    ) 
}

export default Chat;


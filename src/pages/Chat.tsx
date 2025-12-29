import { useState, useEffect, useRef } from 'react'
import './../App.css'
import { Flex } from '@mantine/core'
import ChatBox from '../components/Chat/ChatBox'
import InputBox from '../components/Chat/InputBox'

type ChatProps = {
    isAuthenticated: boolean;
    userEmail?: string;
}

const Chat = ({ isAuthenticated }: ChatProps) => {
    const [messages, setMessages] = useState<string[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);

    // load env variable
    const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    // stop streaming button handler
    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsLoading(false);
    }

    useEffect(() => {
        // scroll to bottom of the chat after new message is added
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };
        scrollToBottom();
    }, [messages]);

    // send message to the server
    const sendMessage = async () => {
        // check if user is authenticated and message is not empty
        if (!inputMessage.trim() || !isAuthenticated) return

        try {
            setIsLoading(true)
            setIsChatStarted(true);
            // add user message to messages
            setMessages(prev => [...prev, `User: ${inputMessage}`])

            // clear input message immediately for better UX
            const messageToSend = inputMessage;
            setInputMessage('')

            // create abort controller for the request
            abortControllerRef.current = new AbortController();

            // stream agent response
            const response = await fetch(`${BASE_URL}/api/chat/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageToSend,
                    sessionId: sessionId
                }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.body) {
                throw new Error();
            }

            // get reader and decoder
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // track agent message index
            let agentMessageIndex = -1;
            setMessages(prev => {
                // add agent message placeholder to messages
                const newMessages = [...prev, `Agent: ...`];
                agentMessageIndex = newMessages.length - 1;
                return newMessages;
            })

            // initialize variables
            let fullResponse = '';
            let hasSeenUserMessage = false;
            const userMessageToSend = messageToSend;

            // update agent message helper function
            const updateAgentMessage = (content: any) => {
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[agentMessageIndex] = `Agent: ${content}`;
                    return newMessages;
                });
            };

            // update error message helper function
            const updateErrorMessage = (error: any) => {
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[agentMessageIndex] = `Error: ${error}`;
                    return newMessages;
                });
            };

            // stream agent response
            while (true) {
                // read chunk
                const {done, value} = await reader.read();
                if (done) break;

                // decode chunk
                const chunk = decoder.decode(value);
                // split chunk into lines
                const lines = chunk.split('\n');

                // iterate over lines
                for (const line of lines) {
                    // check if line starts with data:
                    if (line.startsWith('data: ')) {
                        try {
                            // parse line without "data: "
                            const data = JSON.parse(line.slice(6));

                            // check if type is connected and sessionId is provided
                            if (data.type === 'connected' && data.sessionId) {
                                // store the session ID for subsequent messages
                                setSessionId(data.sessionId);
                            } else if (data.type === 'chunk' || data.type === 'complete') {
                                // skip if this is the user's message echoed back
                                if (data.content === userMessageToSend && !hasSeenUserMessage) {
                                    hasSeenUserMessage = true;
                                    continue;
                                }
                                fullResponse = data.content;
                                updateAgentMessage(fullResponse);

                                // update session ID if provided in complete response
                                if (data.type === 'complete' && data.sessionId) {
                                    setSessionId(data.sessionId);
                                }
                            } else if (data.type === 'error') {
                                // set error message
                                updateErrorMessage(data.error);
                                break;
                            }
                        } catch (e) {
                            console.error('Error parsing SSE data:', e);
                        } 
                    }       
                }
            }  
        } catch (error: any) {
            // check if request is aborted
            if (error.name === 'AbortError') {
                console.log('Request aborted');
            } else {
                console.error('Chat error:', error)
                setMessages(prev => [...prev, `Error: ${error.message}`])
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Flex 
        py={isChatStarted ? 50 : 0} 
        direction={'column'}
        justify={'center'}
        align={'center'}
        h={'90vh'}
        >
            {/* message area */}
            <ChatBox isChatStarted={isChatStarted} messages={messages} viewportRef={viewportRef}/>

            {/* input area */}
            <InputBox 
            sendMessage={sendMessage} 
            stopStreaming={stopStreaming} 
            inputMessage={inputMessage} 
            setInputMessage={setInputMessage} 
            isLoading={isLoading} 
            isChatStarted={isChatStarted}/>
        </Flex>
    ) 
}

export default Chat;


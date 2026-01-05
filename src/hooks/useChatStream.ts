import { useState, useRef } from 'react';
import { postMessage } from '../services/api';

export type ChatMessage = {
    role: 'user' | 'agent' | 'error';
    content: string;
};

export const useChatStream = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController>(new AbortController());

    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsLoading(false);
    };

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        setIsLoading(true);
        setIsChatStarted(true);

        setMessages(prev => [...prev, { role: 'user', content: content }]);

        abortControllerRef.current = new AbortController();

        try {
            const response = await postMessage(content, sessionId, abortControllerRef)

            if (!response.body) throw new Error(`HTTP error! status: ${response}`);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            setMessages(prev => [...prev, { role: 'agent', content: '...' }]);
            
            let fullResponse = '';
            let hasSeenUserMessage = false;
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.type === 'connected' && data.sessionId) {
                                setSessionId(data.sessionId);
                            } else if (data.type === 'chunk' || data.type === 'complete') {
                                if (data.content === content && !hasSeenUserMessage) {
                                    hasSeenUserMessage = true;
                                    continue;
                                }

                                fullResponse = data.content;
                                
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    const lastIndex = newMessages.length - 1;
                                    newMessages[lastIndex] = { ...newMessages[lastIndex], content: fullResponse };
                                    return newMessages;
                                });

                                if (data.type === 'complete' && data.sessionId) {
                                    setSessionId(data.sessionId);
                                }
                            } else if (data.type === 'error') {
                                setMessages(prev => [...prev, { role: 'error', content: data.error }]);
                            }
                        } catch (e) {
                            console.error('Error parsing SSE data:', e);
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                setMessages(prev => [...prev, { role: 'error', content: error.message }]);
            }
        } finally {
            console.log(messages)
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        messages,
        isChatStarted,
        sendMessage,
        stopStreaming
    };
};
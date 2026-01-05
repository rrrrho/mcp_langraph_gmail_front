import { TextInput, ActionIcon } from "@mantine/core";
import { IconBrandTelegram, IconX } from "@tabler/icons-react";
import styles from './input.module.css';
import { useState } from "react";

type SenderProps = {
    isLoading: boolean;
    stopStreaming: () => void;
    sendMessage: (value: string) => void;
}

const Sender = ({ isLoading, stopStreaming, sendMessage, }: SenderProps) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        sendMessage(input);
        setInput('');
    }
    
    return (
        <TextInput
        classNames={{ input: styles.input }}
        w={{ base: '100%', md: '100%'}}
        radius="xl"
        value={input}
        disabled={isLoading}
        placeholder="Ask about your emails..."
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        rightSectionPointerEvents="all"
        rightSection={isLoading ? (
            <ActionIcon variant="transparent" classNames={{ root: styles.button }} onClick={stopStreaming}>
                <IconX color="#383838" size={20} stroke={1.5}/>
            </ActionIcon>
        ) : (
            <ActionIcon
            classNames={{ root: styles.button }}
            variant="transparent" 
            color="withesmoke"
            onClick={handleSend}
            disabled={!input.trim()}
            >
                <IconBrandTelegram size={20} stroke={1.5}/>
            </ActionIcon>
        )}
        />
    );
}

export default Sender;

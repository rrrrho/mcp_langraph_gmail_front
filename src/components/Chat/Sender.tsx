import { TextInput, ActionIcon } from "@mantine/core";
import { IconBrandTelegram, IconX } from "@tabler/icons-react";
import styles from './input.module.css';

type SenderProps = {
    isLoading: boolean;
    inputMessage: string;
    stopStreaming: () => void;
    sendMessage: () => void;
    setInputMessage: (value: string) => void;
}

const Sender = ({ isLoading, inputMessage, stopStreaming, sendMessage, setInputMessage }: SenderProps) => {
    return (
        <TextInput
        classNames={{ input: styles.input }}
        w={'100%'}
        radius="xl"
        value={inputMessage}
        disabled={isLoading}
        placeholder="Ask about your emails..."
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        rightSectionPointerEvents="all"
        rightSection={isLoading ? (
            <ActionIcon variant="transparent" classNames={{ root: styles.button }} onClick={stopStreaming}>
                <IconX color="#121212" size={20} stroke={1.5}/>
            </ActionIcon>
        ) : (
            <ActionIcon
            classNames={{ root: styles.button }}
            variant="transparent" 
            color="withesmoke"
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            >
                <IconBrandTelegram size={20} stroke={1.5}/>
            </ActionIcon>
        )}
        />
    );
}

export default Sender;

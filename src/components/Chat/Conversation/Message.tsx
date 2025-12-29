import { Paper, Text } from "@mantine/core";
import classes from './chat.module.css';

type MessageProps = {
    msg: string;
}

const userStyles: React.CSSProperties = {
    borderRadius: '15px',
    borderBottomRightRadius: '0px',
    background: '#D62D1F',
    alignSelf: 'flex-end',
    color: '#F9B6B1'
}

const agentStyles: React.CSSProperties = {
    borderRadius: '15px',
    borderBottomLeftRadius: '0px',
    background: '#9F170C',
    alignSelf: 'flex-start',
    color: '#F9B6B1'
}

const Message = ({ msg }: MessageProps) => {


    const cleanMessage = (text: string): string => {
        return text.replace(/^(User|Agent):\s*/i, "");
    }

    return (
        <Paper 
        p="md" 
        radius="lg" 
        maw={'80%'}
        style={msg.startsWith('User:') ? userStyles : agentStyles}
        >
            <Text size="sm">{cleanMessage(msg)}</Text>
        </Paper>
    )
}

export default Message;
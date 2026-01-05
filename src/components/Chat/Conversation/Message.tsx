import { Paper, Text } from "@mantine/core";

type MessageProps = {
    content: string,
    role: 'user' | 'agent' | 'error'
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

const Message = ({ content, role }: MessageProps) => {
    return (
        <Paper 
        p="md" 
        radius="lg" 
        maw={'80%'}
        style={role === 'user' ? userStyles : agentStyles}
        >
            <Text size="sm">{content}</Text>
        </Paper>
    )
}

export default Message;
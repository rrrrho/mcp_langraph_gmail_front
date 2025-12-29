import { Avatar, Badge, Flex } from "@mantine/core";

type UserProps = {
    user: string,
    membership: 'PRO' | 'FREE'
}

const User = ({user, membership}: UserProps) => {
    return (
        <Flex align={'center'} gap={2}>
            <Badge color="#868E96" variant="light" radius="xs">{membership}</Badge>;
            <Avatar name={user} size={'3rem'} color="initials" allowedInitialsColors={['red.4']}/>
        </Flex>
    )
}

export default User;
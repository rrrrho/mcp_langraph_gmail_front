import { Avatar, Flex, Text } from "@mantine/core";
import Image from '../../assets/logo.png'

const Logo = () => {
    return (
        <Flex align={'center'}>
            <Avatar src={Image} size={'lg'}/>
            <Text c={'#6D6D6D'} size="1.3rem" mt={15} fw={600}>Capricorn</Text>
        </Flex>
    )
}

export default Logo;
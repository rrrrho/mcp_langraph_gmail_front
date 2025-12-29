import { Box, Container, Flex } from "@mantine/core";
import { type ReactNode } from 'react';
import Logo from "./Logo";
import User from "./User";


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {

    return (
        <Flex direction={'column'} h={'100vh'}>
            <Flex align={'center'} gap={2} py={'1rem'} px={'1.2rem'} justify={'space-between'}>
                <Logo/>
                <User user={'Rocio Ghillino'} membership={'PRO'}/>
            </Flex>
            <Container>
                {children}
            </Container>
        </Flex>
    )
}

export default Layout;
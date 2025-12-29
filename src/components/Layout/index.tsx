import { Flex } from "@mantine/core";
import { type ReactNode } from 'react';
import Logo from "./Logo";
import User from "./User";


type LayoutProps = {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {

    return (
        <Flex direction={'column'} h={'100vh'}>
            <Flex align={'center'} gap={2} p={'1rem'} justify={'space-between'}>
                <Logo/>
                <User user={'Rocio Ghillino'} membership={'PRO'}/>
            </Flex>
            {children}
        </Flex>
    )
}

export default Layout;
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ExitToApp } from '@styled-icons/material-outlined/ExitToApp';
import { AccountBox } from '@styled-icons/material/AccountBox';
import { AccountBalanceWallet } from '@styled-icons/material/AccountBalanceWallet';
import { Graph } from '@styled-icons/octicons/Graph';
import LeftRightArrowButton from '../atoms/LeftRightArrowButton';
import { useWindowSize } from '../../customHooks/useWindowSize';

interface Props {
  logOut: () => void;
  changeThePage: (a: string) => void;
}

const NavBar = ({ logOut, changeThePage }: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const [windowWidth] = useWindowSize();
  const isMobile = windowWidth <= 768 ? true : false;

  useEffect(() => {
    if (isMobile) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  }, [isMobile]);

  function shouldOpenNav(cond: boolean) {
    setIsNavOpen(cond);
  }

  return (
    <Container isNavOpen={isNavOpen}>
      <LeftRightArrowButton isOpen={isNavOpen} onPress={shouldOpenNav} />
      <FlexItem1>
        <MenuContainer>
          <h2 style={{ textAlign: 'center', color: 'rebeccapurple' }}>
            Cashbit
          </h2>
        </MenuContainer>
      </FlexItem1>
      <FlexItem2>
        <MenuContainer>
          <MenuItem>
            <MenuContainer
              onClick={() => {
                changeThePage('wallet');
                if (isMobile) {
                  shouldOpenNav(false);
                }
              }}
            >
              <AccountBalanceIcon />
              Wallet
            </MenuContainer>
          </MenuItem>
          <MenuItem>
            <MenuContainer
              onClick={() => {
                changeThePage('stats');
                if (isMobile) {
                  shouldOpenNav(false);
                }
              }}
            >
              <GraphIcon />
              Stats
            </MenuContainer>
          </MenuItem>
          <MenuItem>
            <MenuContainer
              onClick={() => {
                changeThePage('profile');
                if (isMobile) {
                  shouldOpenNav(false);
                }
              }}
            >
              <AccountIcon />
              Profile
            </MenuContainer>
          </MenuItem>
          <MenuItem>
            <MenuContainer onClick={() => logOut()}>
              <ExitIcon />
              Logout
            </MenuContainer>
          </MenuItem>
        </MenuContainer>
      </FlexItem2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  position: fixed;
  width: 15%;
  top: 0px;
  left: ${(props: { isNavOpen: boolean }) =>
    props.isNavOpen ? '0px' : '-15%'};
  background: lightcyan;
  transition: left 0.2s;
  @media (max-width: 768px) {
    width: 75%;
    z-index: 1;
    left: ${(props: { isNavOpen: boolean }) =>
      props.isNavOpen ? '0px' : '-75%'};
  }
`;

const FlexItem1 = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FlexItem2 = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MenuItem = styled.div`
  padding: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 1rem;
  }
`;

const ExitIcon = styled(ExitToApp)`
  height: 2rem;
  cursor: pointer;

  ${MenuItem}:hover & {
    fill: rebeccapurple;
  }
  @media (max-width: 768px) {
    height: 1.6rem;
  }
`;

const AccountIcon = styled(AccountBox)`
  height: 2rem;
  cursor: pointer;
  ${MenuItem}:hover & {
    fill: rebeccapurple;
  }
  @media (max-width: 768px) {
    height: 1.6rem;
  }
`;

const AccountBalanceIcon = styled(AccountBalanceWallet)`
  height: 2rem;
  cursor: pointer;
  ${MenuItem}:hover & {
    fill: rebeccapurple;
  }
  @media (max-width: 768px) {
    height: 1.6rem;
  }
`;

const GraphIcon = styled(Graph)`
  height: 2rem;
  cursor: pointer;
  ${MenuItem}:hover & {
    fill: rebeccapurple;
  }
  @media (max-width: 768px) {
    height: 1.6rem;
  }
`;

export default NavBar;

// .col-1 {width: 8.33%;}
// .col-2 {width: 16.66%;}
// .col-3 {width: 25%;}
// .col-4 {width: 33.33%;}
// .col-5 {width: 41.66%;}
// .col-6 {width: 50%;}
// .col-7 {width: 58.33%;}
// .col-8 {width: 66.66%;}
// .col-9 {width: 75%;}
// .col-10 {width: 83.33%;}
// .col-11 {width: 91.66%;}
// .col-12 {width: 100%;}

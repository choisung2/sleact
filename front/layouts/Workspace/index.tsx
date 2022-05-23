import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import { Navigate } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data: userData, error, mutate } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {

  }, [])

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header>test</Header>
      <RightMenu>
        <span onClick={onClickUserProfile}>
          <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.email} />
          {showUserMenu && (
            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
              <ProfileModal>
                <img src={gravatar.url(userData.email, { s: '36px', d: 'retro' })} alt={userData.email} />
                <div>
                  <span id="profile-name">{userData.email}</span>
                  <span id="profile-active">Active</span>
                </div>
              </ProfileModal>
              <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
            </Menu>
          )}
        </span>
      </RightMenu>
      <WorkspaceWrapper>
        <Workspaces>{userData?.Workspaces.map((v) => {
          return (
            <Link key={v.id} to={`/workspace/${123}/channel/일반`}>
              <WorkspaceButton>{v.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          )
        })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>MenuScroll</MenuScroll>
        </Channels>
        <Chats>Chats</Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};

export default Workspace;

import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { FC, ReactNode, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';

interface Props {
  children?: ReactNode;
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: FC<Props> = ({ children, show, onCloseModal, setShowCreateChannelModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const { data: channelData, mutate: channelMutate } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e: any) => {
      e.preventDefault();
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setShowCreateChannelModal(false);
          channelMutate();
          setNewChannel('');
        })
        .catch((err) => {
          toast.error(err.response?.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );

  const stopPropagation = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;

import React from 'react'
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
  FolderOpenOutlined,
  SaveOutlined,
  SettingOutlined,
  InfoOutlined,
} from '@ant-design/icons';

interface MenuComponentProps { }

export const MenuComponent: React.FunctionComponent<MenuComponentProps> = (props) => {
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key)
  }

  const items: MenuProps['items'] = [
    {
      label: 'File',
      key: 'SubMenu1',
      children: [
        {
          label: 'Open',
          icon: <FolderOpenOutlined />,
          key: '/disk-open',
        },
        {
          label: 'Save',
          icon: <SaveOutlined />,
          key: '/disk-save',
        },
        {
          type: 'divider',
        },
        {
          label: 'Settings',
          icon: <SettingOutlined />,
          key: '/config',
        }
      ]
    },
    {
      label: 'View',
      key: 'SubMenu2',
      children: [
        {
          label: 'Memory',
          key: '/sampler',
        },
        {
          type: 'divider',
        },
        {
          label: 'Effects',
          key: '/effects',
        },
        {
          label: 'Effect Assignments',
          key: '/effect-assigments',
        },
        {
          type: 'divider',
        },
        {
          label: 'Reverbs',
          key: '/reverbs',
        },
        {
          label: 'Reverb Assignments',
          key: '/reverb-assignments',
        },
        {
          type: 'divider',
        },
        {
          label: 'Status Report',
          icon: <InfoOutlined />,
          key: '/status-report',
        }
      ]
    },
  ]

  return (<Menu mode="horizontal" onClick={onClick} items={items} />)
}
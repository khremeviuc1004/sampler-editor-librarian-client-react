import React from 'react'
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface MenuComponentProps { }

export const MenuComponent: React.FunctionComponent<MenuComponentProps> = (props) => {
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    switch (e.key) {
      case 'sampler':
        navigate('/sampler')
        break;
      case 'config':
        navigate('/config')
        break;
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'File',
      key: 'file',
    },
    {
      label: 'Config',
      key: 'config',
    },
    {
      label: 'View',
      key: 'SubMenu',
      children: [
        {
          label: 'Sampler',
          key: 'sampler',
        }
      ]
    },
  ]

  return (<Menu mode="horizontal" onClick={onClick} items={items} />)
}
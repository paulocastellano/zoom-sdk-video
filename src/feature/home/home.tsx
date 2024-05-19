/* eslint-disable no-restricted-globals */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Button } from 'antd';
import { IconFont } from '../../component/icon-font';
import './home.scss';

const { Meta } = Card;
interface HomeProps extends RouteComponentProps {
  status: string;
  onLeaveOrJoinSession: () => void;
}
const Home: React.FunctionComponent<HomeProps> = (props) => {
  const { history, status, onLeaveOrJoinSession } = props;
  const onCardClick = (type: string) => {
    history.push(`/${type}${location.search}`);
  };
  const featureList = [
    {
      key: 'video',
      icon: 'icon-meeting',
      title: 'Join Meeting',
      description: ''
    }
    // {
    //   key: 'chat',
    //   icon: 'icon-chat',
    //   title: 'Session chat',
    //   description: 'Session Chat, Chat Priviledge'
    // },
    // {
    //   key: 'command',
    //   icon: 'icon-chat',
    //   title: 'Command Channel chat',
    //   description: 'Session Command Channel chat'
    // },
    // {
    //   key: 'subsession',
    //   icon: 'icon-group',
    //   title: 'Subsession',
    //   description: 'Open/Close Subsession, Assign/Move Participants into Subsession, Join/Leave Subsession'
    // },
    // {
    //   key: 'preview',
    //   icon: 'icon-meeting',
    //   title: 'Local Preview',
    //   description: 'Audio and Video preview'
    // }
  ];
  let actionText;
  if (status === 'connected') {
    actionText = 'Leave';
  } else if (status === 'closed') {
    actionText = 'Join';
  }
  return (
    <div>
      {/* <div className="nav">
        <div className="navdoc" />
        {actionText && (
          <Button type="link" className="navleave" onClick={onLeaveOrJoinSession}>
            {actionText}
          </Button>
        )}
      </div> */}

      <div className="home">
        <div className="feature-entry">
          {featureList.map((feature) => {
            const { key, icon, title, description } = feature;
            return (
              <Card
                cover={<IconFont style={{ fontSize: '72px' }} type={icon} />}
                hoverable
                style={{ width: 320 }}
                className="entry-item"
                key={key}
                onClick={() => onCardClick(key)}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;

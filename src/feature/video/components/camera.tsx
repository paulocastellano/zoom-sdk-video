import { useContext } from 'react';
import { Button, Tooltip, Menu, Dropdown } from 'antd';
import { CheckOutlined, UpOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import ZoomMediaContext from '../../../context/media-context';
import classNames from 'classnames';
import { MediaDevice } from '../video-types';
import { getAntdDropdownMenu, getAntdItem, MenuItem } from './video-footer-utils';
interface CameraButtonProps {
  isStartedVideo: boolean;
  isMirrored?: boolean;
  isBlur?: boolean;
  isPreview?: boolean;
  onCameraClick: () => void;
  onSwitchCamera: (deviceId: string) => void;
  onMirrorVideo?: () => void;
  onVideoStatistic?: () => void;
  onBlurBackground?: () => void;
  onSelectVideoPlayback?: (url: string) => void;
  className?: string;
  cameraList?: MediaDevice[];
  activeCamera?: string;
}
const backgrounds = [
  {
    title: 'CLF',
    url: 'https://sigfig-engage-playground-development.s3.us-east-2.amazonaws.com/public/7805ff4e-2581-4130-9b92-1e0f222fe33b'
  },
];
const CameraButton = (props: CameraButtonProps) => {
  const {
    isStartedVideo,
    className,
    cameraList,
    activeCamera,
    isMirrored,
    isBlur,
    isPreview,
    onCameraClick,
    onSwitchCamera,
    onMirrorVideo,
    onVideoStatistic,
    onBlurBackground,
    onSelectVideoPlayback
  } = props;
  const { mediaStream } = useContext(ZoomMediaContext);

  const onMenuItemClick = async (payload: { key: any }) => {
    if (payload.key === 'mirror') {
      onMirrorVideo?.();
    } else if (payload.key === 'statistic') {
      onVideoStatistic?.();
    } else if (payload.key === 'blur') {
      onBlurBackground?.();
    } else if (/^https:\/\//.test(payload.key)) {
      await mediaStream?.updateVirtualBackgroundImage(payload.key);
    } else {
      onSwitchCamera(payload.key);
    }
  };
  const menuItems =
    cameraList &&
    cameraList.length > 0 &&
    ([
      getAntdItem(
        'Select a Camera',
        'camera',
        undefined,
        cameraList.map((item) =>
          getAntdItem(item.label, item.deviceId, item.deviceId === activeCamera && <CheckOutlined />)
        ),
        'group'
      ),
      !isPreview &&
        getAntdItem(
          'Select a Image Background',
          'image',
          undefined,
          backgrounds.map((item) => getAntdItem(item.title, item.url)),
          'group'
        ),
      getAntdItem('', 'd1', undefined, undefined, 'divider'),
      !isPreview &&
        !mediaStream?.isRenderSelfViewWithVideoElement() &&
        getAntdItem('Mirror My Video', 'mirror', isMirrored && <CheckOutlined />),
      mediaStream?.isSupportVirtualBackground()
        ? getAntdItem('Blur My Background', 'blur', isBlur && <CheckOutlined />)
        : getAntdItem('Mask My Background', 'blur'),
      !isPreview && getAntdItem('', 'd2', undefined, undefined, 'divider'),
      !isPreview && getAntdItem('Video Statistic', 'statistic')
    ].filter(Boolean) as MenuItem[]);
  return (
    <div className={classNames('camera-footer', className)}>
      {isStartedVideo && menuItems ? (
        <Dropdown.Button
          className="vc-dropdown-button"
          size="large"
          menu={getAntdDropdownMenu(menuItems, onMenuItemClick)}
          onClick={onCameraClick}
          trigger={['click']}
          type="ghost"
          icon={<UpOutlined />}
          placement="topRight"
        >
          <VideoCameraOutlined />
        </Dropdown.Button>
      ) : (
        <Tooltip title={`${isStartedVideo ? 'stop camera' : 'start camera'}`}>
          <Button
            className={classNames('vc-button', className)}
            icon={isStartedVideo ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />}
            ghost={true}
            shape="circle"
            size="large"
            onClick={onCameraClick}
          />
        </Tooltip>
      )}
    </div>
  );
};
export default CameraButton;

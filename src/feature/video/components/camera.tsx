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
    title: 'Disney',
    url: 'https://sigfig-engage-playground-test.s3.us-east-2.amazonaws.com/public/7bf27584-e2ca-4a2a-b29b-4a697c80a954?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJIMEYCIQC%2BHScfkmiv93fC11xV3R8BLZHzTYB6bPkE%2F2xQLqXfHwIhAPIaj9omOxTCGXfEo61ycyy1q6ihsobry4YvgbyLkcOxKvgCCF8QABoMMTk1NzA0MTU0MzM5IgzSDwmq4Kt3YOiMhWEq1QIYRCzrb%2Bm7e4LdC77CP6VDDe%2Fd2xK3v36IURlzBjEKWAoMHPs%2FKNABsjg3k1OSMc9U1LO0OobzmERKPD4X8IhU%2F%2Fth%2BmMYoIfgT9fZjK8fAG4IrnpSrpao%2BuBXpqcq5ZutoEtjYtamUbn7BljtiBVpSKgIatYA2JsNMfAMRa5VwLSIaGrZkUF%2FszvEKRZDBb65arb7RGcUWI%2BAicutz5m9xbge8pUOhiUvzJHt9eiMC6p%2Fk4SO48MvvuqQ2uC2i55L33%2FN08Bu1%2FqD2XXP7w3lBm1E5eILyC5zAucTV90%2Fx9tA3xqMCAFxvGhZD1ZVtaYnfpzfwetbgdFYmDEZLChtz1lgeE%2FxEQGCQLtWLLFQXLAMGqWV%2FJAVWqzRnpekRKQh%2By9VDjIuZCjXu55I2JfiYDvIDXjzbBkJvv9iGzrXe6EpkIIfBhbdiRpszLV7LovEIgr4ATD13YO5BjqdARyZ6HTJW5W5DhxhfT6bwl7%2B5hFpk7Wx2ofvD7fRCDuvpLhpq1WkNJluFO8QozTY7nbY4ToamM8H%2BSGZh2NY99NMKruq920QplDVjaPvWHJlM%2FGB1pRAXSafBvR%2FQ0tz6%2F%2Ffb7k5w68TvXZBVKMW3oCzhbDcNYljvkrz6p9FrL0l7i28ZKnNKns5uKqoOPnRgSEwPa5KfVt%2Bs%2FGjzFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS3EHANDRSKFO3O4W%2F20241029%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241029T141942Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=69d52ac2d4655d6827ac21669a34a6783908acce36d83c6e0bce550ca2cc2a53'
  },
  {
    title: 'Sigfig',
    url: 'https://sigfig-engage-playground-test.s3.us-east-2.amazonaws.com/public/19191b8e-44ff-4730-a658-06249c916fbf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJIMEYCIQC%2BHScfkmiv93fC11xV3R8BLZHzTYB6bPkE%2F2xQLqXfHwIhAPIaj9omOxTCGXfEo61ycyy1q6ihsobry4YvgbyLkcOxKvgCCF8QABoMMTk1NzA0MTU0MzM5IgzSDwmq4Kt3YOiMhWEq1QIYRCzrb%2Bm7e4LdC77CP6VDDe%2Fd2xK3v36IURlzBjEKWAoMHPs%2FKNABsjg3k1OSMc9U1LO0OobzmERKPD4X8IhU%2F%2Fth%2BmMYoIfgT9fZjK8fAG4IrnpSrpao%2BuBXpqcq5ZutoEtjYtamUbn7BljtiBVpSKgIatYA2JsNMfAMRa5VwLSIaGrZkUF%2FszvEKRZDBb65arb7RGcUWI%2BAicutz5m9xbge8pUOhiUvzJHt9eiMC6p%2Fk4SO48MvvuqQ2uC2i55L33%2FN08Bu1%2FqD2XXP7w3lBm1E5eILyC5zAucTV90%2Fx9tA3xqMCAFxvGhZD1ZVtaYnfpzfwetbgdFYmDEZLChtz1lgeE%2FxEQGCQLtWLLFQXLAMGqWV%2FJAVWqzRnpekRKQh%2By9VDjIuZCjXu55I2JfiYDvIDXjzbBkJvv9iGzrXe6EpkIIfBhbdiRpszLV7LovEIgr4ATD13YO5BjqdARyZ6HTJW5W5DhxhfT6bwl7%2B5hFpk7Wx2ofvD7fRCDuvpLhpq1WkNJluFO8QozTY7nbY4ToamM8H%2BSGZh2NY99NMKruq920QplDVjaPvWHJlM%2FGB1pRAXSafBvR%2FQ0tz6%2F%2Ffb7k5w68TvXZBVKMW3oCzhbDcNYljvkrz6p9FrL0l7i28ZKnNKns5uKqoOPnRgSEwPa5KfVt%2Bs%2FGjzFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS3EHANDRSKFO3O4W%2F20241029%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241029T141942Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=e559f88039abaaa113e7a42594438426d9390e61a050e1d30770e7b5b7189873'
  },
  {
    title: 'Image 03',
    url: 'https://sigfig-engage-playground-test.s3.us-east-2.amazonaws.com/public/d2fcb611-3900-40bc-ae10-6f95692fd0de?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJIMEYCIQC%2BHScfkmiv93fC11xV3R8BLZHzTYB6bPkE%2F2xQLqXfHwIhAPIaj9omOxTCGXfEo61ycyy1q6ihsobry4YvgbyLkcOxKvgCCF8QABoMMTk1NzA0MTU0MzM5IgzSDwmq4Kt3YOiMhWEq1QIYRCzrb%2Bm7e4LdC77CP6VDDe%2Fd2xK3v36IURlzBjEKWAoMHPs%2FKNABsjg3k1OSMc9U1LO0OobzmERKPD4X8IhU%2F%2Fth%2BmMYoIfgT9fZjK8fAG4IrnpSrpao%2BuBXpqcq5ZutoEtjYtamUbn7BljtiBVpSKgIatYA2JsNMfAMRa5VwLSIaGrZkUF%2FszvEKRZDBb65arb7RGcUWI%2BAicutz5m9xbge8pUOhiUvzJHt9eiMC6p%2Fk4SO48MvvuqQ2uC2i55L33%2FN08Bu1%2FqD2XXP7w3lBm1E5eILyC5zAucTV90%2Fx9tA3xqMCAFxvGhZD1ZVtaYnfpzfwetbgdFYmDEZLChtz1lgeE%2FxEQGCQLtWLLFQXLAMGqWV%2FJAVWqzRnpekRKQh%2By9VDjIuZCjXu55I2JfiYDvIDXjzbBkJvv9iGzrXe6EpkIIfBhbdiRpszLV7LovEIgr4ATD13YO5BjqdARyZ6HTJW5W5DhxhfT6bwl7%2B5hFpk7Wx2ofvD7fRCDuvpLhpq1WkNJluFO8QozTY7nbY4ToamM8H%2BSGZh2NY99NMKruq920QplDVjaPvWHJlM%2FGB1pRAXSafBvR%2FQ0tz6%2F%2Ffb7k5w68TvXZBVKMW3oCzhbDcNYljvkrz6p9FrL0l7i28ZKnNKns5uKqoOPnRgSEwPa5KfVt%2Bs%2FGjzFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS3EHANDRSKFO3O4W%2F20241029%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241029T141942Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=fbb38eaa6b223a6d014506433b0680cd66d0c7f9315d9d98e453d85dbc3db354'
  },
  {
    title: 'Image 04',
    url: 'https://sigfig-engage-playground-test.s3.us-east-2.amazonaws.com/public/fb0987c9-bdb9-4ef1-9c78-0a34fdf40db4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJIMEYCIQC%2BHScfkmiv93fC11xV3R8BLZHzTYB6bPkE%2F2xQLqXfHwIhAPIaj9omOxTCGXfEo61ycyy1q6ihsobry4YvgbyLkcOxKvgCCF8QABoMMTk1NzA0MTU0MzM5IgzSDwmq4Kt3YOiMhWEq1QIYRCzrb%2Bm7e4LdC77CP6VDDe%2Fd2xK3v36IURlzBjEKWAoMHPs%2FKNABsjg3k1OSMc9U1LO0OobzmERKPD4X8IhU%2F%2Fth%2BmMYoIfgT9fZjK8fAG4IrnpSrpao%2BuBXpqcq5ZutoEtjYtamUbn7BljtiBVpSKgIatYA2JsNMfAMRa5VwLSIaGrZkUF%2FszvEKRZDBb65arb7RGcUWI%2BAicutz5m9xbge8pUOhiUvzJHt9eiMC6p%2Fk4SO48MvvuqQ2uC2i55L33%2FN08Bu1%2FqD2XXP7w3lBm1E5eILyC5zAucTV90%2Fx9tA3xqMCAFxvGhZD1ZVtaYnfpzfwetbgdFYmDEZLChtz1lgeE%2FxEQGCQLtWLLFQXLAMGqWV%2FJAVWqzRnpekRKQh%2By9VDjIuZCjXu55I2JfiYDvIDXjzbBkJvv9iGzrXe6EpkIIfBhbdiRpszLV7LovEIgr4ATD13YO5BjqdARyZ6HTJW5W5DhxhfT6bwl7%2B5hFpk7Wx2ofvD7fRCDuvpLhpq1WkNJluFO8QozTY7nbY4ToamM8H%2BSGZh2NY99NMKruq920QplDVjaPvWHJlM%2FGB1pRAXSafBvR%2FQ0tz6%2F%2Ffb7k5w68TvXZBVKMW3oCzhbDcNYljvkrz6p9FrL0l7i28ZKnNKns5uKqoOPnRgSEwPa5KfVt%2Bs%2FGjzFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS3EHANDRSKFO3O4W%2F20241029%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241029T141942Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=e4b0f1b52e5fb72ac17364bebae903612b4ccf2b37e91693fa146ace9f1490e9'
  },
  {
    title: 'Image 05',
    url: 'https://sigfig-engage-playground-test.s3.us-east-2.amazonaws.com/public/69013996-7a9c-4196-b0af-96b352f19981?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJIMEYCIQC%2BHScfkmiv93fC11xV3R8BLZHzTYB6bPkE%2F2xQLqXfHwIhAPIaj9omOxTCGXfEo61ycyy1q6ihsobry4YvgbyLkcOxKvgCCF8QABoMMTk1NzA0MTU0MzM5IgzSDwmq4Kt3YOiMhWEq1QIYRCzrb%2Bm7e4LdC77CP6VDDe%2Fd2xK3v36IURlzBjEKWAoMHPs%2FKNABsjg3k1OSMc9U1LO0OobzmERKPD4X8IhU%2F%2Fth%2BmMYoIfgT9fZjK8fAG4IrnpSrpao%2BuBXpqcq5ZutoEtjYtamUbn7BljtiBVpSKgIatYA2JsNMfAMRa5VwLSIaGrZkUF%2FszvEKRZDBb65arb7RGcUWI%2BAicutz5m9xbge8pUOhiUvzJHt9eiMC6p%2Fk4SO48MvvuqQ2uC2i55L33%2FN08Bu1%2FqD2XXP7w3lBm1E5eILyC5zAucTV90%2Fx9tA3xqMCAFxvGhZD1ZVtaYnfpzfwetbgdFYmDEZLChtz1lgeE%2FxEQGCQLtWLLFQXLAMGqWV%2FJAVWqzRnpekRKQh%2By9VDjIuZCjXu55I2JfiYDvIDXjzbBkJvv9iGzrXe6EpkIIfBhbdiRpszLV7LovEIgr4ATD13YO5BjqdARyZ6HTJW5W5DhxhfT6bwl7%2B5hFpk7Wx2ofvD7fRCDuvpLhpq1WkNJluFO8QozTY7nbY4ToamM8H%2BSGZh2NY99NMKruq920QplDVjaPvWHJlM%2FGB1pRAXSafBvR%2FQ0tz6%2F%2Ffb7k5w68TvXZBVKMW3oCzhbDcNYljvkrz6p9FrL0l7i28ZKnNKns5uKqoOPnRgSEwPa5KfVt%2Bs%2FGjzFk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAS3EHANDRSKFO3O4W%2F20241029%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20241029T141942Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=397efa15d2be0e4cb7279fdf52608d037164d1e6cfc3f518d5e957c7c26092ea'
  }
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

import { Button } from '@material-tailwind/react';
import profileimage from '../../../assets/profileimage.png';

export default function LeftBarProfile({ idx, item, isFollow }) {
  // 사용자 프로필 이미지가 존재할 경우 서버 URL을 앞에 추가하고, 없을 경우 기본 이미지 사용
  const profileImageUrl = item.profile_picture
    ? `http://localhost:8080${item.profile_picture.replace('/Users/HYERYEONG/git/ShareTime-BE/ShareTime/uploads/', '/images/')}` // 상대 경로에서 절대 경로로 변경
    : profileimage; // 프로필 이미지가 없을 경우 기본 이미지 사용

  return (
    <div key={idx} className="flex items-center justify-between py-2 gap-2">
      <img
        src={profileImageUrl}
        alt="profile"
        className="w-9 h-9 rounded-full"
      />
      <div className="flex-col justify-between items-center">
        <span className="text-white font-bold">{item.name}</span>
        <Button className="text-white text-[8px] bg-[#68C5CB] rounded-full px-2 py-1">
          {isFollow ? 'UnFollow' : 'Follow'}
        </Button>
      </div>
    </div>
  );
}

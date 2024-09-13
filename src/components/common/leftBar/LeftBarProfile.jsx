import {Button} from '@material-tailwind/react';

export default function LeftBarProfile({ idx, item, isFollow }) {
    return (
        <div key={idx} className="flex items-center justify-between py-2 gap-2">
        <img
          src={item.profile}
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
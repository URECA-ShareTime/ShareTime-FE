import logoImg from '../../../assets/logo.png';
import HeaderProfile from './HeaderProfile';
import { useNavigate } from 'react-router-dom';

export default function Header({ img }) {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate('/main');
  }

  return (
    <div className="flex justify-between items-center bg-white h-header w-full px-[40px] py-[30px]">
      <img src={logoImg} alt="logo" className="top-5 left-5 h-[30px]" onClick={handleClickLogo}/>
      <HeaderProfile />
    </div>
  );
}

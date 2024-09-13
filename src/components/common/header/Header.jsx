import logoImg from '../../../assets/logo.png';
import HeaderProfile from './HeaderProfile';

export default function Header({ img }) {
  return (
    <div className="flex justify-between items-center bg-white h-[80px] w-full px-[40px] py-[30px]">
      <img src={logoImg} alt="logo" className="top-5 left-5 h-[30px]" />
      <HeaderProfile img={img} />
    </div>
  );
}

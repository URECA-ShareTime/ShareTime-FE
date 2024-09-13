import myProfileImg from '../../../assets/myProfile.png';

export default function HeaderProfile() {
    return (
        <>
            <img src={myProfileImg} alt="profileImg" className="w-[40px] h-[40px]"/>
        </>
    )
}